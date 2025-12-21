-- Migration: Create sites and pages tables for website provisioning
-- Created: December 20, 2025
-- Purpose: Enable users to create and manage multiple websites based on base-template

-- Create sites table
CREATE TABLE IF NOT EXISTS public.sites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  domain VARCHAR(255) UNIQUE NOT NULL,
  custom_domain VARCHAR(255) UNIQUE,
  template_id VARCHAR(50) DEFAULT 'base-template' NOT NULL,
  is_published BOOLEAN DEFAULT false,
  theme_config JSONB DEFAULT '{
    "primaryColor": "#3b82f6",
    "secondaryColor": "#8b5cf6",
    "fontFamily": "Inter",
    "logo": null,
    "favicon": null
  }'::jsonb,
  seo_config JSONB DEFAULT '{
    "title": "",
    "description": "",
    "keywords": [],
    "og_image": null
  }'::jsonb,
  analytics_config JSONB DEFAULT '{
    "google_analytics_id": null,
    "facebook_pixel_id": null
  }'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Create pages table for site content
CREATE TABLE IF NOT EXISTS public.pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id UUID REFERENCES public.sites(id) ON DELETE CASCADE NOT NULL,
  slug VARCHAR(255) NOT NULL,
  title VARCHAR(255),
  body JSONB DEFAULT '{
    "components": [],
    "layout": "default"
  }'::jsonb,
  is_published BOOLEAN DEFAULT false,
  meta JSONB DEFAULT '{
    "title": "",
    "description": "",
    "keywords": []
  }'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(site_id, slug)
);

-- Create site_analytics table for tracking
CREATE TABLE IF NOT EXISTS public.site_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id UUID REFERENCES public.sites(id) ON DELETE CASCADE NOT NULL,
  page_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  last_viewed TIMESTAMP WITH TIME ZONE,
  analytics_data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_profiles table (enhanced from profiles)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  display_name VARCHAR(100),
  avatar_url TEXT,
  company_name VARCHAR(255),
  industry VARCHAR(100),
  website VARCHAR(255),
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'starter', 'pro', 'enterprise')),
  subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'cancelled', 'expired')),
  sites_limit INTEGER DEFAULT 1,
  storage_limit_mb INTEGER DEFAULT 100,
  bandwidth_limit_gb INTEGER DEFAULT 10,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_sites_owner_id ON public.sites(owner_id);
CREATE INDEX IF NOT EXISTS idx_sites_domain ON public.sites(domain);
CREATE INDEX IF NOT EXISTS idx_pages_site_id ON public.pages(site_id);
CREATE INDEX IF NOT EXISTS idx_pages_slug ON public.pages(site_id, slug);
CREATE INDEX IF NOT EXISTS idx_site_analytics_site_id ON public.site_analytics(site_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_subscription ON public.user_profiles(subscription_tier);

-- Enable Row Level Security
ALTER TABLE public.sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for sites
CREATE POLICY "Users can view own sites" ON public.sites
  FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Users can insert own sites" ON public.sites
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update own sites" ON public.sites
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete own sites" ON public.sites
  FOR DELETE USING (auth.uid() = owner_id);

CREATE POLICY "Published sites viewable by all" ON public.sites
  FOR SELECT USING (is_published = true);

-- RLS Policies for pages
CREATE POLICY "Users can view pages of own sites" ON public.pages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.sites 
      WHERE sites.id = pages.site_id 
      AND sites.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert pages in own sites" ON public.pages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.sites 
      WHERE sites.id = pages.site_id 
      AND sites.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can update pages in own sites" ON public.pages
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.sites 
      WHERE sites.id = pages.site_id 
      AND sites.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete pages from own sites" ON public.pages
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.sites 
      WHERE sites.id = pages.site_id 
      AND sites.owner_id = auth.uid()
    )
  );

CREATE POLICY "Published pages viewable by all" ON public.pages
  FOR SELECT USING (
    is_published = true AND 
    EXISTS (
      SELECT 1 FROM public.sites 
      WHERE sites.id = pages.site_id 
      AND sites.is_published = true
    )
  );

-- RLS Policies for site_analytics
CREATE POLICY "Users can view analytics of own sites" ON public.site_analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.sites 
      WHERE sites.id = site_analytics.site_id 
      AND sites.owner_id = auth.uid()
    )
  );

-- RLS Policies for user_profiles
CREATE POLICY "Public profiles viewable by everyone" ON public.user_profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Trigger to create user_profile when new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (
    id, 
    display_name, 
    avatar_url,
    company_name,
    industry,
    role
  )
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'display_name',
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'company_name',
    NEW.raw_user_meta_data->>'industry',
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created_profile ON auth.users;

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created_profile
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_profile();

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to all tables
CREATE TRIGGER set_sites_updated_at
  BEFORE UPDATE ON public.sites
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_pages_updated_at
  BEFORE UPDATE ON public.pages
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_site_analytics_updated_at
  BEFORE UPDATE ON public.site_analytics
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Function to check site creation limits
CREATE OR REPLACE FUNCTION public.check_site_creation_limit()
RETURNS TRIGGER AS $$
DECLARE
  user_site_count INTEGER;
  user_limit INTEGER;
BEGIN
  -- Get user's current site count and limit
  SELECT COUNT(*) INTO user_site_count
  FROM public.sites
  WHERE owner_id = NEW.owner_id;

  SELECT sites_limit INTO user_limit
  FROM public.user_profiles
  WHERE id = NEW.owner_id;

  -- Check if limit exceeded
  IF user_site_count >= user_limit THEN
    RAISE EXCEPTION 'Site creation limit reached. Please upgrade your plan.';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add trigger to check site limits before creation
CREATE TRIGGER check_site_limit_before_insert
  BEFORE INSERT ON public.sites
  FOR EACH ROW EXECUTE FUNCTION public.check_site_creation_limit();
