import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (error, req, res) => {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` })
  },
  onNoMatch: (req, res) => {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  }
})

handler.post(
  async (req, res) => {
    const bodyToSend = JSON.stringify({
      content: 'Nueva solicitud de unirse a equipo',
      embeds: [
        {
          title: 'Solicitud de unirse a equipo',
          color: 3782986,
          fields: Object.entries(req.body).map(([key, value]) => ({
            name: key,
            value,
            inline: false
          })),
          timestamp: new Date().toISOString()
        }
      ]
    })
    const response = await fetch(process.env.DISCORD_JOIN_WEBHOOK_URL || '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: bodyToSend
    })
    if (response.ok) {
      res.status(200).json({ message: 'Form sent' })
    } else {
      res.status(500).json({ message: 'Something went wrong' })
    }
  }
)

export default handler
