
const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")

const OWNER = "255651373899@s.whatsapp.net"
const PREFIX = "."
let spamMap = {}

function menuText(){
return `🔥 *REAL HACKER BOT*
━━━━━━━━━━━━━━━━━
👑 Owner Commands
.addadmin
.deladmin
.botinfo

🛡 Group Protection
.antispam on/off
.antilink on/off

🤖 Auto System
.autoreply on/off

📡 Hacker Tools (Education)
.nmap
.hydra
.sqlmap
.metasploit
.john

⚙ Utility
.ping
.menu
.owner

⚡ Style Menu v2`
}

async function startBot(){

const { state, saveCreds } = await useMultiFileAuthState("session")

const sock = makeWASocket({
auth: state,
printQRInTerminal: true
})

sock.ev.on("creds.update", saveCreds)

let settings = {
antispam:true,
antilink:true,
autoreply:true
}

sock.ev.on("messages.upsert", async ({ messages }) => {

const msg = messages[0]
if(!msg.message) return

const from = msg.key.remoteJid
const sender = msg.key.participant || msg.key.remoteJid

let text =
msg.message.conversation ||
msg.message.extendedTextMessage?.text ||
""

if(!text) return

// SPAM PROTECTION
if(settings.antispam){
spamMap[sender] = (spamMap[sender] || 0) + 1
setTimeout(()=> spamMap[sender] = 0 , 5000)

if(spamMap[sender] > 6){
await sock.sendMessage(from,{text:"💣 Spam detected. Slow down."})
return
}
}

// AUTO REPLY
if(settings.autoreply){
if(text.toLowerCase() === "hi"){
await sock.sendMessage(from,{text:"👋 Hello, I am REAL HACKER BOT"})
}
}

// COMMAND HANDLER
if(!text.startsWith(PREFIX)) return

const cmd = text.slice(1).split(" ")[0].toLowerCase()

if(cmd === "menu"){
await sock.sendMessage(from,{text:menuText()})
}

if(cmd === "ping"){
await sock.sendMessage(from,{text:"🏓 Bot Online"})
}

if(cmd === "owner"){
await sock.sendMessage(from,{text:"👑 Owner: 255651373899"})
}

if(cmd === "botinfo"){
await sock.sendMessage(from,{text:"⚙ REAL HACKER BOT\nVersion: 2.0"})
}

// GROUP SETTINGS
if(cmd === "antispam"){
settings.antispam = text.includes("on")
await sock.sendMessage(from,{text:"🛡 Antispam updated"})
}

if(cmd === "antilink"){
settings.antilink = text.includes("on")
await sock.sendMessage(from,{text:"🛡 Antilink updated"})
}

if(cmd === "autoreply"){
settings.autoreply = text.includes("on")
await sock.sendMessage(from,{text:"🤖 Auto reply updated"})
}

// HACKING TOOLS INFO (educational)
if(cmd === "nmap"){
await sock.sendMessage(from,{text:"📡 Nmap: Network scanner used in cybersecurity auditing."})
}

if(cmd === "hydra"){
await sock.sendMessage(from,{text:"🔐 Hydra: Password testing tool used in penetration testing."})
}

if(cmd === "sqlmap"){
await sock.sendMessage(from,{text:"💉 SQLMap: Tool for testing SQL injection vulnerabilities."})
}

if(cmd === "metasploit"){
await sock.sendMessage(from,{text:"🚀 Metasploit: Framework used for penetration testing."})
}

if(cmd === "john"){
await sock.sendMessage(from,{text:"🔑 John the Ripper: Password cracking tool used in security testing."})
}

})

}

startBot()
