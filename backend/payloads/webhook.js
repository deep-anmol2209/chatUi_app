const fs = require("fs")
const path = require("path")
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require("dotenv")

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
const payloadsDir = './payloads';

async function processFile(filePath, db) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(raw);

  const entry = data?.metaData?.entry?.[0];
  const value = entry?.changes?.[0]?.value;
  console.log("hello");
  
 console.log(value.metadata.display_phone_number);
 
  const conversations = db.collection('conversations');
  const messages = db.collection('messages');

  // 🟢 Handle message payload
  if (value?.messages) {
    const msg = value.messages[0];
    const contact = value.contacts?.[0];

    const wa_id = contact?.wa_id;
    const name = contact?.profile?.name || '';
    const from = msg.from ;
    const to = msg.from === contact?.wa_id? value.metadata.display_phone_number : contact?.wa_id
    const timestamp = new Date(parseInt(msg.timestamp) * 1000);
    const messageText = msg?.text?.body || '';
    const msgId = msg.id;

    // 🔎 Find or create conversation
    let convo = await conversations.findOne({ wa_id });
    if (!convo) {
      const result = await conversations.insertOne({
        wa_id,
        name,
        messages: [],
        last_updated: timestamp
      });
      convo = { _id: result.insertedId, wa_id, name };
    }

    // ✅ Insert message
    const existingMsg = await messages.findOne({ message_id: msgId });
    if (!existingMsg) {
      const result = await messages.insertOne({
        conversation: convo._id,
        message_id: msgId,
        from,
        to,
        message: messageText,
        type: msg.type || 'text',
        status: 'sent',
        timestamp
      });

      // 🧩 Push message to conversation
      await conversations.updateOne(
        { _id: convo._id },
        {
          $push: { messages: result.insertedId },
          $set: { last_updated: timestamp }
        }
      );

      console.log(`Inserted message from ${wa_id}`);
    } else {
      console.log(`Message already exists: ${msgId}`);
    }
  }

  // 🔄 Handle status update
  if (value?.statuses) {
    const status = value.statuses[0];
    const msgId = status.id || status.meta_msg_id;
    const newStatus = status.status;
    const statusTime = new Date(parseInt(status.timestamp) * 1000);

    const result = await messages.updateOne(
      { message_id: msgId },
      {
        $set: {
          status: newStatus,
          timestamp: statusTime
        }
      }
    );

    if (result.matchedCount > 0) {
      console.log( `Updated status for ${msgId} to '${newStatus}'`);
    } else {
      console.warn( `Message not found for status update: ${msgId}`);
    }
  }
}

async function main() {
  try {
    await client.connect();
    const db = client.db('whatsapp');

    const files = fs.readdirSync(payloadsDir).filter(file => file.endsWith('.json'));

    for (const file of files) {
      const filePath = path.join(payloadsDir, file);
      console.log(`Processing file: ${file}`);
      await processFile(filePath, db);
    }

    console.log(' All payloads processed!');
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await client.close();
  }
}

main();