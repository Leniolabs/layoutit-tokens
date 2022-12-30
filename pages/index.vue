<template>
  <div>
    <nav>
      <h1><icons-token/>Design Tokens Generator</h1>

      <div class="top-actions">
        <a target="_blank" href="https://www.leniolabs.com/services/" style="background: transparent;border: 2px solid #e1d472;color:#e1d472;">Hire our Team!</a>
        <button style="opacity: 0.5;background: transparent;border: 2px solid #54c4c9;color:#54c4c9;">Share URL</button>
        <button style="background:#54c4c9;border: 2px solid #54c4c9" @click="downloadZip(JSON.stringify(transformDTCG(),null,2), transformCSSvars('CSS'), transformCSSvars('SASS'), JSON.stringify(transformDSP(), null, 2), transformTheo(exportFormats.theo), exportFormats.theo)">Download Tokens</button>
      </div>
    </nav>

    <div class="container">

      <!-- Sidebar -->

      <div class="sidebar" :key="componentKey">
        <h2>Token Sets</h2>
        <div class="sidebar-item" :class="{active: selectedToken === i}" @click="selectedToken = i" v-for="(token, i) in sets" :key="`token-${i}`" >
          <div class="sidebar-titleitem">{{token.title}}</div>
          <div class="sidebar-subitem" v-if="selectedToken === i">
            <a :href="`#${tokene.$type}`" v-for="(tokene, ee) in token.tokens" :key="`token-${ee}`">
              {{tokene.$name}}
            </a>
          </div>
        </div>
        <leniologo/>
      </div>

      <!-- Content -->

      <div class="content" v-if="mode === 'table'">
        <h2>{{ sets[selectedToken].title }}</h2>

          <div class="token-group">
            <button class="add-retoken" @click="addToken()">New Token</button>
          </div>


        <div class="content-tokens" :key="componentKey">

          <div class="single-token" :id="token.$type" v-for="(token, e) in sets[selectedToken].tokens" :key="`token-${e}`">

            <div class="actions">
              <button class="add-token">
                <svg style="opacity:0;" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none' stroke='transparent' stroke-width='8' stroke-linecap='round' stroke-linejoin='round'><line x1="20" y1="50" x2="80" y2="50" /> <line x1="50" y1="20" x2="50" y2="80" /></svg>
                <select name="tokentypes" @change="changeType($event,token)">
                  <option v-for="type in tokenTypes" :selected="type === token.$type" :value="type" :key="`${type}`" >{{type}}</option>
                </select>
              </button>

              <button class="add-token" @click="addVariant(e)"> <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none' stroke='#0E1A27' stroke-width='8' stroke-linecap='round' stroke-linejoin='round'><line x1="20" y1="50" x2="80" y2="50" /> <line x1="50" y1="20" x2="50" y2="80" /></svg> Add</button>

              <button @click="$delete(sets[selectedToken].tokens, e)"><icons-delete/></button>
            </div>

            <h3>
              <component :is="`icons-${token.$type}`"/>
              <input type="text" v-model="token.$name" />
              <i>({{ token.tokens.length }})</i>
            </h3>

            <div class="variants" v-if="token.tokens.length > 0">
              <div class="single-variant" v-for="(variant, a) in token.tokens" :key="`variant-${a}`">

                <previews-wrapper>
                  <component :is="`previews-${token.$type}`" :variant="variant"/>
                </previews-wrapper>

                <input type="text" v-model="variant.$name" placeholder="Name">
                <input type="text" v-model="variant.$value" placeholder="Value">
                <input type="text" v-model="variant.$description" placeholder="Description">
                <button @click="$delete(token.tokens, a)"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none' stroke='#0E1A27' stroke-width='8' stroke-linecap='round' stroke-linejoin='round'><line x1="15" y1="15" x2="85" y2="85" /> <line x1="85" y1="15" x2="15" y2="85" /></svg></button>
              </div>
            </div>

          </div>

        </div>
      </div>


      <div class="content" v-if="mode === 'grid'">
        <h2>{{ sets[selectedToken].title }}</h2>

          <div class="token-group">
            <button class="add-retoken" @click="addToken()">New Token</button>
          </div>


        <div class="content-tokens" :key="componentKey">

          <div class="single-token" :id="token.$type" v-for="(token, e) in sets[selectedToken].tokens" :key="`token-${e}`">

            <div class="actions">
              <button class="add-token">
                <svg style="opacity:0;" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none' stroke='transparent' stroke-width='8' stroke-linecap='round' stroke-linejoin='round'><line x1="20" y1="50" x2="80" y2="50" /> <line x1="50" y1="20" x2="50" y2="80" /></svg>
                <select name="tokentypes" @change="changeType($event,token)">
                  <option v-for="type in tokenTypes" :selected="type === token.$type" :value="type" :key="`${type}`" >{{type}}</option>
                </select>
              </button>

              <button class="add-token" @click="addVariant(e)"> <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none' stroke='#0E1A27' stroke-width='8' stroke-linecap='round' stroke-linejoin='round'><line x1="20" y1="50" x2="80" y2="50" /> <line x1="50" y1="20" x2="50" y2="80" /></svg> Add</button>

              <button @click="$delete(sets[selectedToken].tokens, e)"><icons-delete/></button>
            </div>

            <h3><component :is="`icons-${token.$type}`"/> <input type="text" v-model="token.$name" /> <i>({{ token.tokens.length }})</i></h3>

            <div class="variants" v-if="token.tokens.length > 0">
              <div class="single-variant" v-for="(variant, a) in token.tokens" :key="`variant-${a}`">

                <previews-wrapper>
                  <component :is="`previews-${token.$type}`" :variant="variant"/>
                </previews-wrapper>

                <input type="text" v-model="variant.$name" placeholder="Name">
                <input type="text" v-model="variant.$value" placeholder="Value">
                <input type="text" v-model="variant.$description" placeholder="Description">
                <button @click="$delete(token.tokens, a)"><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none' stroke='#0E1A27' stroke-width='8' stroke-linecap='round' stroke-linejoin='round'><line x1="15" y1="15" x2="85" y2="85" /> <line x1="85" y1="15" x2="15" y2="85" /></svg></button>
              </div>
            </div>

          </div>

        </div>
      </div>
      <!-- Output -->

      <div class="output" :key="`output-${componentKey}`">
        <div style="position:relative;">
          <div class="export-options">
            <div v-for="(option, i) in exportOptions" :key="`abc-${i}`" @click="selectedOption = i" :class="{'active': selectedOption === i}">
              {{option}}
            </div>
          </div>
          <client-only>
            <button class="copy-btn" @click="copyTokenToClipboard()">Copy</button>
            <pre v-if="selectedOption === 0"><code v-highlight class="json" v-html="JSON.stringify(transformDTCG(),null,2)"></code></pre>
            <pre v-if="selectedOption === 1"><code v-highlight class="css" v-html="transformCSSvars('CSS')"></code></pre>
            <pre v-if="selectedOption === 2"><code v-highlight class="scss" v-html="transformCSSvars('SASS')"></code></pre>
            <pre v-if="selectedOption === 3"><code v-highlight class="json" v-html="transformDSP()"></code></pre>
            <pre v-if="selectedOption === 4">
              <div class="theo-specs-radio">
                <div>
                  <input type="radio" id="json" value="JSON" v-model="exportFormats.theo" />
                  <label for="one">JSON</label>
                </div>
                <div>
                  <input type="radio" id="yaml" value="YAML" v-model="exportFormats.theo" />
                  <label for="one">YAML</label>
                </div>
              </div>
              <code v-highlight :class="exportFormats.theo" v-html="transformTheo(exportFormats.theo)"></code>
            </pre>
          </client-only>

        </div>
      </div>
   </div>
</div>

</template>

<script>

import yaml from "js-yaml";
import JSZip from 'jszip';
import { transformTokenTypeByGroupType } from '../utils'


export default {
  data() {
    return {
      componentKey: 0,
      selectedToken: 1,
      selectedOption: 0,
      mode: 'table',
      tokenTypes: ['color','spacing','fontFamily','fontWeight','fontStyle','fontSize','duration','cubicBezier','letterSpacing','lineHeight','opacity','shadow','mediaQuery','z-index','radius','other'],
      exportOptions: ['DTCG','CSS','SASS','DSP','Theo'],
      exportFormats: {
        theo: "JSON"
      },
      sets: [
        {
          title: "Create New",
          tokens: []
        },
        {
          title: "Sample Tokens",
          tokens: [
            {
              $type: "color",
              $name: "Color",
              "tokens": [
                {
                  $name: "background-body",
                  "$value": "#233042"
                },
                {
                  $name: "primary-body",
                  "$value": "#354156"
                },
                {
                  $name: "blue-light",
                  "$value": "#30aab3"
                },
                {
                  $name: "yellow",
                  "$value": "#ffca30"
                },
                {
                  $name: "red",
                  "$value": "#fa3757"
                },
                {
                  $name: "red-dark",
                  "$value": "#e02045"
                },
                {
                  $name: "green-dark",
                  "$value": "#4d967b"
                },
                {
                  $name: "background-primary",
                  "$value": "#fcfcf4"
                },
              ]
            },
            {
              $type: "spacing",
              $name: "Spacing",
              "tokens": [
                {
                  $name: "small",
                  "$value": "4px"
                },
                {
                  $name: "medium",
                  "$value": "8px"
                },
                {
                  $name: "large",
                  "$value": "12px"
                },
                {
                  $name: "x-large",
                  "$value": "20px"
                },
              ]
            },
            {
              $type: "duration",
              $name: "Duration",
              "tokens": [{
                  $name: "paused",
                  "$value": "paused"
                },
                {
                  $name: "slow",
                  "$value": "3s"
                },
                {
                  $name: "fast",
                  "$value": "500ms"
                },
              ]
            },
            {
              $type: "easing",
              $name: "Easing",
              "tokens": [
                {
                  $name: "easeInSine",
                  "$value": "cubic-bezier(0.12, 0, 0.39, 0)"
                },
                {
                  $name: "easeOutSine",
                  "$value": "cubic-bezier(0.61, 1, 0.88, 1)500ms"
                },
              ]
            },
            {
              $type: "radius",
              $name: "Radius",
              "tokens": [
                {
                  $name: "circle",
                  "$value": "50%"
                },
                {
                  $name: "large",
                  "$value": "8px"
                },
                {
                  $name: "small",
                  "$value": "2px",
                },
              ]
            },

            {
              $type: "opacity",
              $name: "Opacity",
              "tokens": [
                {
                  $name: "opacity-25",
                  "$value": "0.25"
                },
                {
                  $name: "opacity-50",
                  "$value": "0.5"
                },
                {
                  $name: "opacity-75",
                  "$value": "0.75"
                },
              ]
            },
            {
              $type: "shadow",
              $name: "Shadow",
              "tokens": [
                {
                  $name: "level-1",
                  "$value": "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20);"
                },
                {
                  $name: "level-2",
                  "$value": "0 3px 4px 0 rgba(0,0,0,0.14), 0 3px 3px -2px rgba(0,0,0,0.12), 0 1px 8px 0 rgba(0,0,0,0.20);"
                },
                {
                  $name: "level-3",
                  "$value": "0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)"
                },
              ]
            },
            {
              $type: "mediaQuery",
              $name: "Media Query",
              "tokens": [
                {
                  $name: "max-width-mobile",
                  "$value": "600px"
                },
                {
                  $name: "max-width-tablet",
                  "$value": "1024px"
                },
              ]
            },
            {
              $type: "fontFamily",
              $name: "Font Family",
              "tokens": [
                {
                  $name: "body",
                  "$value": "Arial, Helvetica, sans-serif"
                },
                {
                  $name: "headings",
                  "$value": "Palatino Linotype, serif"
                },
              ]
            },
            {
              $type: "fontSize",
              $name: "Font Size",
              "tokens": [
                {
                  $name: "caption",
                  "$value": "12px"
                },
                {
                  $name: "body",
                  "$value": "16px"
                },
                {
                  $name: "headings",
                  "$value": "26px"
                },
              ]
            },
            {
              $type: "letterSpacing",
              $name: "Letter Spacing",
              "tokens": [
                {
                  $name: "dense",
                  "$value": "-1px"
                },
                {
                  $name: "double",
                  "$value": "2px"
                },
              ]
            },
            {
              $type: "lineHeight",
              $name: "Line Height",
              "tokens": [{
                  $name: "heading",
                  "$value": "1.25"
                },
                {
                  $name: "reset",
                  "$value": "1"
                },
                {
                  $name: "text",
                  "$value": "1.5"
                },
              ]
            },

          ]
        },



      ]
    }
  },
  methods: {
    transformDSP() {
      const now = (new Date()).toISOString();
      const updatedBy = "Layoutit" // or Design Tokens Generator
      var newObj = {
        dsp_spec_version: "1.0",
        last_updated_by: updatedBy,
        last_updated: now,
        settings: {},
        entities: []
      };
      var copyObj = JSON.parse(JSON.stringify(this.sets[this.selectedToken]));
      for (const group of copyObj.tokens) {
        for (const token of group.tokens) {
          const { $type } = group;
          const type = ($type === "color" || $type === "size") ? $type : "custom";
          const entity = {
            class: "token",
            type,
            id: `${group.$type}_${token.$name}`,
            value: token.$value,
            last_updated: now,
            last_updated_by: updatedBy,
            description: token.$description || "",
          };
          newObj.entities.push(entity);
        }
      }
      return newObj;
    },
    transformTheo(format) {
      var newObj = { props: {} };
      var copyObj = JSON.parse(JSON.stringify(this.sets[this.selectedToken]));
      for (const group of copyObj.tokens) {
        for (const token of group.tokens) {
          newObj.props[`${group.$type}_${token.$name}`] = {
            value: token.$value,
            type: group.$type,
            category: group.$type
          }
        }
      }
      if (format === "YAML") return yaml.dump(newObj);
      return JSON.stringify(newObj, null, 2);
    },
    transformDTCG() {
      var newObj = {}
      var copyObj = JSON.parse(JSON.stringify(this.sets[this.selectedToken]));
      for (const group of copyObj.tokens) {
        var singleTokens = {}
        for (const item of group.tokens) {
          singleTokens[item.$name] = item
          delete singleTokens[item.$name]["$name"];
        }
        newObj[group.$name] = {
          $type: transformTokenTypeByGroupType(group.$type),
          ...singleTokens
        }
        delete newObj[group.$name]["$name"];
      }
      return newObj
    },
    transformCSSvars(transformType) {
      var newObj = []
      var copyObj = JSON.parse(JSON.stringify(this.sets[this.selectedToken]));
      const kebabCase = string => string.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, '-').toLowerCase();
      for (const group of copyObj.tokens) {
        var singleTokens = []
        for (const item of group.tokens) {

          if (transformType === 'SASS') {
            singleTokens.push(`$${kebabCase(group.$name)}-${item.$name}: ${item.$value}`)
          }
          if (transformType === 'CSS') {
            singleTokens.push(`--${kebabCase(group.$name)}-${item.$name}: ${item.$value}`)
          }
         }
        newObj.push(singleTokens)
      }

      if (transformType === 'SASS') {
        return newObj.flat(1).join(';\n');
      }
      if (transformType === 'CSS') {
        return `:root {
          ${newObj.flat(1).join(';\n')}
        }`
      }
     },
    changeType(event,token) {
      token.$type = event.target.value
      token.$name = event.target.value
    },
    updateTitle(event,token) {
      token.$name = event.target.innerHTML
    },
    changeMode(event,token) {
      token.$name = event.target.innerHTML
    },
    addToken() {
      var tempToken = {
        "$type": "other",
        $name: `Token #${this.sets[this.selectedToken].tokens.length+1}`,
        "tokens": [{
          $name: "other-1",
            "$value": "",
          }]
      }
      this.sets[this.selectedToken].tokens.unshift(tempToken)
     },
    addVariant(token) {
      var tempToken = {
        $name: `other-${this.sets[this.selectedToken].tokens[token].tokens.length+1}`,
        "$value": ""
      }
      this.sets[this.selectedToken].tokens[token].tokens.unshift(tempToken)
    },
    downloadZip(dtcg, css, sass, dsp, theo, typesTheo) {
      var zip = new JSZip();
      var tokensZip = zip.folder('Tokens')
      var typesTheoLowerCase = typesTheo.toLowerCase();
      tokensZip.file('dtcg.json', dtcg)
      tokensZip.file('styles.css', css)
      tokensZip.file('styles.scss', sass)
      tokensZip.file('dsp.json', dsp)
      tokensZip.file(`theo.${typesTheoLowerCase}`, theo)
      tokensZip.generateAsync({ type: 'base64'}).then(function(base64) {
        window.location = 'data:application/zip;base64,' + base64;
      })
    },
    copyTokenToClipboard() {
      let [tokenParentElement] = document.getElementsByTagName("CODE");
      navigator.clipboard.writeText(tokenParentElement.innerText);
      let [copyButtonElement] = document.getElementsByClassName("copy-btn");
      copyButtonElement.innerText = "Copied"
  
      setTimeout(() => {
        copyButtonElement.innerText = "Copy"
      }, 2000);
    },
  }
}
</script>

<style lang="scss">
  @import "./styles/global-ui.scss";
  @import "./styles/sidebar.scss";
  @import "./styles/main-content.scss";
  @import "./styles/output.scss";
</style>
