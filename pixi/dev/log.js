const LOG_SENDER_MAX_LENGTH = 18;
export default function(sender, message, level) {
    console.log(`[${new Date().toString()} - ${sender}${" ".repeat(LOG_SENDER_MAX_LENGTH - sender.length)}] - ${message}`)
}
