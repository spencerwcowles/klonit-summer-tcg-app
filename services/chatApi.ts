import { promptClient } from '../lib/api';

export type PromptRequest = {
  prompt: string;
  voice_type: 'FEMALE' | 'MALE';
  chatbot_id: string;          // UUID required by Prompt API
  lang_type?: 'en';
  session_type?: string;
  timezone?: string;           // IANA TZ
};

export type PromptResponse = {
  message: string;             // "successfully"
  transcript: string;
  bot_reply: string;
  ans_voice?: string;          // base64 WAV (optional)
};

export async function getPrompt(req: PromptRequest): Promise<PromptResponse> {
  // supply sensible defaults; backend accepts these
  const body = {
    lang_type: 'en',
    session_type: req.session_type ?? '1234567891234567',
    timezone: req.timezone ?? 'America/New_York',
    ...req,
  };
  
  const { data }  = await promptClient.post<PromptResponse>('/get-prompt', body);
  return data;

}
