export default function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '60px 40px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        width: '100%'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: '#1e40af',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          🔐 Auth Tool
        </h1>
        
        <h2 style={{
          fontSize: '1.5rem',
          color: '#475569',
          marginBottom: '30px',
          fontWeight: 'normal'
        }}>
          Hello World... this is the Auth Tool
        </h2>
        
        <div style={{
          backgroundColor: '#f1f5f9',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '30px'
        }}>
          <p style={{
            color: '#64748b',
            margin: 0,
            fontSize: '1rem',
            lineHeight: '1.6'
          }}>
            This is a standalone authentication tool built with Next.js 15 and React 19.
            It will serve as a dedicated authentication service for your applications.
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginTop: '30px'
        }}>
          <div style={{
            backgroundColor: '#dbeafe',
            padding: '15px',
            borderRadius: '8px',
            borderLeft: '4px solid #3b82f6'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#1e40af', fontSize: '1rem' }}>
              🚀 Next.js 15
            </h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
              Latest Next.js with App Router
            </p>
          </div>
          
          <div style={{
            backgroundColor: '#fef3c7',
            padding: '15px',
            borderRadius: '8px',
            borderLeft: '4px solid #f59e0b'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#92400e', fontSize: '1rem' }}>
              ⚛️ React 19
            </h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
              Modern React with TypeScript
            </p>
          </div>
          
          <div style={{
            backgroundColor: '#dcfce7',
            padding: '15px',
            borderRadius: '8px',
            borderLeft: '4px solid #22c55e'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#15803d', fontSize: '1rem' }}>
              🔒 Auth Ready
            </h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
              Ready for Firebase & OAuth
            </p>
          </div>
        </div>
        
        <div style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{
            color: '#374151',
            marginBottom: '15px',
            fontSize: '1.1rem'
          }}>
            Next Steps:
          </h3>
          <ul style={{
            textAlign: 'left',
            color: '#6b7280',
            lineHeight: '1.8',
            margin: 0,
            paddingLeft: '20px'
          }}>
            <li>Set up Firebase Authentication</li>
            <li>Implement login/signup forms</li>
            <li>Add OAuth providers (Google, GitHub)</li>
            <li>Deploy to Vercel</li>
            <li>Configure as microservice</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
