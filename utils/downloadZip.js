import JSZip from 'jszip';

export function downloadZip(dtcg, css, sass, dsp, theo, typesTheo) {
  const zip = new JSZip();
  const tokensZip = zip.folder('Tokens')
  const typesTheoLowerCase = typesTheo.toLowerCase();
  tokensZip.file('dtcg.json', dtcg)
  tokensZip.file('styles.css', css)
  tokensZip.file('styles.scss', sass)
  tokensZip.file('dsp.json', dsp)
  tokensZip.file(`theo.${typesTheoLowerCase}`, theo)
  tokensZip.generateAsync({ type: 'base64'}).then(function(base64) {
    window.location = 'data:application/zip;base64,' + base64;
  })
}
