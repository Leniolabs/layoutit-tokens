<template>
  <div>
    <nav>
      <h1><icons-token/>Design Tokens Generator</h1>

      <div class="top-actions">
        <a target="_blank" href="https://www.leniolabs.com/services/" style="background: transparent;border: 2px solid #e1d472;color:#e1d472;">Hire our Team!</a>
        <button style="opacity: 0.5;background: transparent;border: 2px solid #54c4c9;color:#54c4c9;">Share URL</button>
        <button style="background:#54c4c9;border: 2px solid #54c4c9" @click="downloadZipFile()">Download Tokens</button>
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

import yaml from 'js-yaml';
import { downloadZip } from '../utils/downloadZip';
import { transformTokenTypeByGroupType } from '../utils';
import { kebabCase } from '../utils/string';
import { setNestedProperty } from '../utils/setNestedProperty';
import { klona } from 'klona';


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
      const newTokenObj = {
        dsp_spec_version: "1.0",
        last_updated_by: updatedBy,
        last_updated: now,
        settings: {},
        entities: []
      };
      const copyObj = klona(this.sets[this.selectedToken]);

      const entities = copyObj.tokens.reduce((entitiesAccumulator, group) => {
        const { $type } = group;
        return entitiesAccumulator.concat(
          group.tokens.map((token) =>
            Object.assign({
              class: "token",
              type: ($type === "color" || $type === "size") ? $type : "custom",
              id: `${$type}_${token.$name}`,
              value: token.$value,
              last_updated: now,
              last_updated_by: updatedBy,
              description: token.$description || "",
            })
          ))
      }, [])
      // Assign entities to object.
      newTokenObj.entities = entities;

      return newTokenObj;
    },
    transformTheo(format) {
      const copyObj = klona(this.sets[this.selectedToken]);
      let newTokenObj = { props: {} };

      const tokenProps = copyObj.tokens.reduce((acc, group) => {
        group.tokens.forEach((token) => {
          setNestedProperty(acc, `${group.$type}_${token.$name}.value`, token.$value);
          setNestedProperty(acc, `${group.$type}_${token.$name}.type`, group.$type);
          setNestedProperty(acc, `${group.$type}_${token.$name}.category`, group.$type);
        })
        return { ...acc };
      }, {});
      // Assign object with token props
      newTokenObj.props = tokenProps;

      if (format === "YAML") return yaml.dump(newTokenObj);
      return JSON.stringify(newTokenObj, null, 2);
    },
    transformDTCG() {
      const copyObj = klona(this.sets[this.selectedToken]);

      const newTokenObj = copyObj.tokens.reduce((accumulatorObj, group) => {
        group.tokens.forEach((token) => {
          setNestedProperty(accumulatorObj,`${group.$name}.$type`, transformTokenTypeByGroupType(group.$type));
          setNestedProperty(accumulatorObj, `${group.$name}.${token.$name}.$value`, token.$value);
        })
        return {...accumulatorObj};
      }, {});

      return newTokenObj;
    },
    transformCSSvars(transformType) {
      const copyObj = klona(this.sets[this.selectedToken]);
      let tokenPrefix = transformType === 'SASS' ? '$' : '--';
      const newTokenArr = copyObj.tokens.reduce((tokenAccumulator, group) => {
        return tokenAccumulator.concat(
          group.tokens.map((token) =>
            `${tokenPrefix}${kebabCase(group.$name)}-${token.$name}: ${token.$value}`
          )
        );
      }, []);

      if (transformType === 'SASS') return newTokenArr.join(';\n');
      return `:root {
        ${newTokenArr.join(';\n')}
      }`
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
      const tempToken = {
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
      const tempToken = {
        $name: `other-${this.sets[this.selectedToken].tokens[token].tokens.length+1}`,
        "$value": ""
      }
      this.sets[this.selectedToken].tokens[token].tokens.unshift(tempToken)
    },
    downloadZipFile() {
      downloadZip(
        JSON.stringify(this.transformDTCG(),null,2),
        this.transformCSSvars('CSS'),
        this.transformCSSvars('SASS'),
        JSON.stringify(this.transformDSP(), null, 2),
        this.transformTheo(this.exportFormats.theo),
        this.exportFormats.theo
      )
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
