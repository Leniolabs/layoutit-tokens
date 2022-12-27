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
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap');

@keyframes run {
  0% { transform: translateX(125%) translateY(-125%); }
  100% { transform: translateX(-125%) translateY(100%); }
}

@keyframes fill {
  0% { bottom: 0; }
  100% { bottom: 100%; }
}

::selection { background: rgba(172,206,247,0.25); }
::-moz-selection { background: rgba(172,206,247,0.25); }

html { box-sizing: border-box; }

*, *:before, *:after { box-sizing: inherit; }

body {
  margin: 0;
  min-height: 100vh;
  font-family: Arial, Helvetica, sans-serif;
  color: #1e1e1e;
  background: #1e1e1e;
  user-select: none;
}

input {
  font-size: 14px;
}

nav {
  background: #000;
  height: 60px;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 999;
}

h1 {
  margin: 0;
  line-height: 60px;
  color: #fff;
  font-weight: normal;
  font-family: "Space Grotesk",Arial, Helvetica, sans-serif;
  padding-left: 20px;
  color: #e2d372;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 1px;
}

h2 {
  margin: 0 0 18px;
  font-weight: 500;
  font-family: montserrat, Arial, Helvetica, sans-serif;
  font-size: 1.17em;

}

h3 {
  margin: 0;
  margin-bottom: 15px;
  font-weight: 500;
  font-family: montserrat, Arial, Helvetica, sans-serif;
  color: #1e1e1e;
  display: flex;
  align-items: center;
  input {
    border: 0;
    font-weight: 500;
    font-family: montserrat, Arial, Helvetica, sans-serif;
    color: #1e1e1e;
    font-size: 18px;
  }
  &:last-child {
    margin: 0;
  }
  svg {
    width: 24px;
    height: auto;
    margin-right: 5px;
    margin-left: 0px;
    fill: #888;
  }
  i {
    color:#aaa;
    padding-left:4px;
    font-size:18px;
    font-weight: 400;
    font-style: normal;
    display: none;
  }
}

button {
  background: transparent;
  border: none;
  cursor: pointer;
}

pre {
  color: #fff;
  overflow: auto;
  margin: 0;
  padding: 0;
  user-select: all;
  height: calc(100vh - 130px);
}


nav button {
  background: #e1d472;
  padding: 8px 15px;
  border-radius: 2px;
}

input[type="text"]:focus {
  background: #f6fbf6;
}

.json:not(.hljs) {
  color: transparent !important;
}

.hljs {
  background: transparent;
  padding: 0 !important;
  &.language-css {
    color: #ddd;
    .hljs-attr {
      padding-left: 20px;
    }
  }
  &.language-scss {
    color: #ddd;
  }
  .hljs-built_in {
    color: #d8d7ac;
  }
  .hljs-variable,
  .hljs-attr {
    color: #98d6f7;
  }
  .hljs-selector-pseudo {
    color: #cdb682;
  }
  .hljs-string {
    color: #ce9178;
  }
  .hljs-number {
    color: #baccab;
  }
  .hljs-punctuation {
    color: #d4d4d4;
  }
}


button.add-token {
  color: #888;
  display: inline-flex;
  align-items: center;
  svg {
    stroke: #888;
    margin-right: 3px;
  }
  &:hover {
    color: #01579b;

    svg {
      stroke: #01579b;
    }
  }
}

.output {
  padding: 15px;
  padding-left: 0;
  background: #1e1e1e;
  color: #fff;
  width: 450px;
  position: fixed;
  right: 0;
  top: 60px;
  bottom: 0;
  @media only screen and (max-width: 1340px) {
    width: 350px;
  }
  @media only screen and (max-width: 1120px) {
    position: relative;
    top: 0;
    padding-left: 15px;
    width: 100%;
  }

  > div {
    background: #1e1e1e;
    background: #151515;
    //border: 1px solid #444;
    padding: 10px;
    padding-right: 15px;
    padding-top: 30px;
    color: #fff;
    border-radius: 3px;
  }
  .export-options {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: #333;
    display: flex;
    font-size: 14px;


    > div {
      flex: 1;
      text-align: center;
      padding: 7px 10px;
      cursor: pointer;
      opacity: 0.75;
      border-right: 1px solid #1e1e1e;

      &:hover {
        opacity: 1;
      }

      &.active {
        background: #151515;
        font-weight: bold;
        opacity: 1;
      }
    }
  }

  .theo-specs-radio {
    position: absolute;
    right: 20px;
    display: flex;
    flex-flow: column;

    > div {
      display: flex;

      &:first-child {
        margin-bottom: 8px;
      }
    }
  }
}



.container {
  display: flex;
  padding-left: 220px;
  padding-right: 450px;
  padding-top: 60px;
  @media only screen and (max-width: 1340px) {
    padding-right: 350px;
  }
  @media only screen and (max-width: 1240px) {
    padding-left: 0px;
  }
  @media only screen and (max-width: 1120px) {
    padding-right: 0px;
    flex-direction: column;
  }
  > * {
    flex: 1;
  }
  .content {
    padding: 20px;
    position: relative;
    background: #1e1e1e;
    color: #fff;

    button {
      padding: 5px 10px;
    }
  }
}



.sidebar {
  width: 210px;
   background: #1e1e1e;
  color: #fff;
  height: 100vh;
  overflow: auto;
  padding-top: 20px;
  position: fixed;
  padding-left: 10px;
  top: 60px;
  left: 0;
  @media only screen and (max-width: 1240px) {
    transform: translateX(-100%);
  }
  h2 {
    padding-top: 0;
    padding-left: 10px;
    margin-bottom: 10px;
  }
  .sidebar-item:hover {
    opacity: 1;
  }
  .sidebar-titleitem {
      opacity: 0.75;
      padding: 10px;
      padding-left: 15px;
      margin-bottom: 5px;
    }
  .active > .sidebar-titleitem {
    background: #fff;
    color: #1e1e1e;
    border-radius: 3px;
    opacity: 1;
  }
  .sidebar-subitem {
    padding-left: 20px;
    margin-top: 10px;

    > a {
      margin-bottom: 8px;
      opacity: 0.75;
      display: block;
      text-decoration: none;
      color: #fff;
      &:hover {
        opacity: 1;
      }
    }
  }
  button {
    padding: 5px 10px;
    position: absolute;
    top: 15px;
    right: 10px;
  }
  > {
    * {
      cursor: pointer;
    }

  }
}




.token-group {
  border-radius: 3px;
  color: #888;
  position: absolute;
  top: 15px;
  right: 20px;
  display: flex;
  gap: 10px;
  > * {
    flex: 1;
  }
  button {
    color:#333;
    padding: 10px 15px !important;
    border-radius: 2px;

    background: #fff;
    display: inline-flex;
    align-items: center;
    svg {
      width: 20px;
      margin-right: 5px;
      fill: #ddd;
      display: none;
    }
    &:hover {
      background: #eee;
    }
  }
}



.single-token {
  margin-bottom: 12px;
  position: relative;
  background: #fff;
  padding: 20px;
  padding-top: 15px;
  border-radius: 3px;
  box-shadow: 0 0 6px #000;

  &:not(:last-child):before {
    content: "";
    background: #fff;
    width: 5px;
    height: 15px;
    position: absolute;
    bottom: -15px;
    left: 25px;
    z-index: 9;
  }
  .variants {
  max-height: 270px;
  overflow: auto;
  }
  .single-variant {
    margin-bottom: 10px;
    width: 100%;
    display: flex;
    gap: 5px;

    > * {
      flex: 1;
    }

    button {
      position: relative;
      top: 0;
      right: 0;
    }
    input {
      padding: 11px;
      border: 1px #ccc solid;
      border-radius: 2px;
    }
    > *:last-child {
      max-width: 35px;
      min-width: 35px;

      svg {
        stroke: #888;
        stroke-width: 9px;
      }

      &:hover svg {
        stroke: red;
      }
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}



.actions {
  position: absolute;
  top: 15px;
  right: 18px;
  select {
    border: 0;
    border-radius: 2px;
    color: #666;
    max-width: 125px;
    text-align: right;
    background: #fff;
    cursor: pointer;
    &:hover {
      color: #333;
    }
    }

  button {
    padding-left: 0 !important;

    svg {
      width: 18px;
      fill: #888;

    }
    &:hover svg {
      fill: red;
    }
  }
}


.content-tokens {
  display: flex;
  flex-direction: column;
  &:empty:after {
    content: "No Tokens in this set. \a Add one to start!";
    background: #151515;
    white-space: pre;
    line-height: 24px;
    color: #ddd;
    padding: 35px 20px;
    text-align: center;
  }
}

.top-actions {
  position: absolute;
  top: 12px;
  right: 15px;
  @media only screen and (max-width: 1120px) {
    display: none;
  }
  a,
  button {
    display:inline-block;
    padding: 8px 15px;
    font-family: "Space Grotesk",Arial, Helvetica, sans-serif;
    margin-left: 10px;
    text-decoration: none;
    font-size: 13px;
  }
}

button[disabled] {
  opacity: 0.5;
  cursor: initial;

}

</style>
