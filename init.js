module["exports"] = {
    port:3002,
    allbot: {
        baseURL: "https://spika.support/cloverbot/webhook",
        endpointURL:"/cloverbot",
        webhookReceiverURL: "/webhook",
        fileSenderURL: "/file",
        downloadPath: "./downloads",
        loglevel:"debug",
        service : [
        {
            identifier:'facebook-weatherbot-en',
            provider:"facebook",
            config:{
                verifyToken: 'weatherbot',
                accessToken: 'EAAZAJHfgqZBZBsBAGjxF54B5XZAjLLaeLcKIgO9yU7MolfxV64Qq0WPJ0hp7uB5BrgZB9UrGcHZC3yYSvhyEOCGU6LihH5jVMAJiiXWvIZACjaya0Q4lw1LjzSEUVjNKmSswVNvnPV8WK0uZBWp8vAw8ebZBMdHMZAaR3N7qhy6eJGWgZDZD',
                pageId:'806755696200102',
                replyToBot: false 
            }
        },
        {
            identifier:'line-weatherbot-ja',
            provider:'line',
            config:{
                channelSecret: 'c2c8b161b001fc73e5fe244d6ae26249', 
                channelAccessToken: '3oIGg4RjcBt8AV9BG3gugRmsCjtw6/OADsrqnZ6a0JwkT/3FUTQzU7UhFAqTi1CvwCDgH+0jyFsCIm30+bcHiDAAgxIYHbhnZB8t0oAoUJZvKwIX33rNicCBChIQHcgm2J/E5Q2Z/H6fNdPrlGOMPAdB04t89/1O/w1cDnyilFU=' 
            }
        }]
    }
  }