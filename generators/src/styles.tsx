export const styles: {[key:string]: React.CSSProperties} = {
  title: {
    fontSize: '1.5em', 
    fontWeight: 'bold'
  },
  componentBoxStyle: {
    border: '2px solid #888',
    borderRadius: '8px',
    padding: '16px',
    backgroundColor: '#1e1e1e',
    color: 'white',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    marginBottom: '20px',
  },
  appHeader: {
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  },
  button: {

    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '12px 20px',
    fontSize: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)'

  }
}