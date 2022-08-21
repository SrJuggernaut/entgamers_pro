import { Container, Paper, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Paper
      sx={{
        paddingBlock: 1
      }}
    >
      <Container
        sx={(theme) => ({
          display: 'grid',
          gridTemplateColumns: '1fr',
          [theme.breakpoints.up('md')]: {
            gridTemplateColumns: '1fr 1fr'
          },
          [theme.breakpoints.up('lg')]: {
            gridTemplateColumns: '1fr 1fr 1fr'
          }
        })}
      >
        <div>
          <Typography variant="h3" component="div" align="center">Lorem, ipsum dolor.</Typography>
          <ul>
            <li>Lorem ipsum dolor sit.</li>
            <li>Recusandae iste similique numquam.</li>
            <li>Ullam, fuga. Quibusdam, eos.</li>
          </ul>
        </div>
        <div>
          <Typography variant="h3" component="div" align="center">Non, iste quasi.</Typography>
          <ul>
            <li>Lorem ipsum dolor sit.</li>
            <li>Recusandae iste similique numquam.</li>
            <li>Ullam, fuga. Quibusdam, eos.</li>
          </ul>
        </div>
        <div>
          <Typography variant="h3" component="div" align="center">Error, et quod?</Typography>
          <ul>
            <li>Lorem ipsum dolor sit.</li>
            <li>Recusandae iste similique numquam.</li>
            <li>Ullam, fuga. Quibusdam, eos.</li>
          </ul>
        </div>
      </Container>
    </Paper>
  )
}
export default Footer
