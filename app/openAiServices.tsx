import Configuration from "openai"
import OpenAIApi from "openai"

const configuration : any = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default openai