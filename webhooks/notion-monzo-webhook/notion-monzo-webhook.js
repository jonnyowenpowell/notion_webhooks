const { Client } = require("@notionhq/client")


const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})
const database_id = process.env.NOTION_DATABASE_ID

const handler = async (event) => {
  try {
    const req = JSON.parse(event.body)
    if (req.type === 'transaction.created') {
      const amount = req.data.amount / 100
      const description = req.data.description
      await notion.pages.create({
        parent: { database_id },
        properties: {
          Name: [{ text: { content: description } }],
          Amount: amount,
        },
      })
    }
    
    return { statusCode: 200 }
  } catch (error) {
    console.log(error)
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
