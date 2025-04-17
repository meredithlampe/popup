export const H1 = (props) => (
  <h1 style={{ marginBottom: '0px', marginTop: '0px' }}>{props.children}</h1>
)

export const H2 = (props) => (
  <h2 style={{ marginBottom: '0px', marginTop: '0px' }}>{props.children}</h2>
)

export const H3 = (props) => (
  <h3
    style={{
      marginBottom: '0px',
      fontWeight: 'bold',
      marginTop: '0px',
    }}
  >
    {props.children}
  </h3>
)

export const H3Light = (props) => (
  <h3
    style={{
      marginBottom: '0px',
      fontWeight: 100,
      marginTop: '0px',
    }}
  >
    {props.children}
  </h3>
)

export const H4 = (props) => (
  <h4 style={{ marginBottom: '0px', marginTop: '0px' }}>{props.children}</h4>
)

export const H4Bold = (props) => (
  <h4
    style={{
      marginBottom: '0px',
      fontWeight: 'bold',
      marginTop: '0px',
    }}
  >
    {props.children}
  </h4>
)

export const H5 = (props) => (
  <h5
    style={{
      marginBottom: '0px',
      fontWeight: 'bold',
      marginTop: '0px',
    }}
  >
    {props.children}
  </h5>
)

export const SmallText = (props) => (
  <div style={{ fontSize: '16px' }}>{props.children}</div>
)
