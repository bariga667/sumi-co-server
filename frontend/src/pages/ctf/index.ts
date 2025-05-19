// frontend/src/pages/ctf/index.ts

import Level1SourceInspect from './Level1SourceInspect';
import Level2LocalStorage from './Level2LocalStorage';
import Level3CookieChallenge from './Level3CookieChallenge';
import Level4ConsoleTrap from './Level4ConsoleTrap';
import Level5XSS from './Level5XSS';
import Level6XSSBase64 from './Level6XSSBase64';
import Level7BypassLogin from './Level7BypassLogin';
import Level8Obfuscation from './Level8Obfuscation';
import Level9HiddenField from './Level9HiddenField';
import Level10CookieBypass from './Level10CookieBypass';
// Добавь остальные, если есть

export const CTF_TASK_COMPONENTS: Record<string, React.ComponentType<any>> = {
  Level1SourceInspect,
  Level2LocalStorage,
  Level3CookieChallenge,
  Level4ConsoleTrap,
  Level5XSS,
  Level6XSSBase64,
  Level7BypassLogin,
  Level8Obfuscation,
  Level9HiddenField,
  Level10CookieBypass,
};
