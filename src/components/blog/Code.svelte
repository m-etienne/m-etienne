<script lang="ts">
  import Highlight from "svelte-highlight";
	import 
  { 
    bash,
    javascript,
    json, 
    plaintext,
    python,
    sql,
    typescript,
    xml,
    yaml, 

    type LanguageType, 
  } from "svelte-highlight/languages";

  export let portableText;

  const code = portableText.value.code;
  const sanityLanguage = portableText.value.language
  let language;

  switch (sanityLanguage) {
    case 'bash':
      language = bash; 
      break;
    case 'javascript':
      language = javascript; 
      break;
    case 'json':
      language = json; 
      break;
    case 'python':
      language = python; 
      break;
    case 'mysql':
    case 'sql':
      language = sql; 
      break;
    case 'typescript':
      language = typescript; 
      break;
    case 'html':
    case 'xml':
      language = xml; 
      break;
    case 'yaml':
      language = yaml; 
      break;
    default:
      language = plaintext;
}
</script>

<Highlight language={language} {code} />