<template>
  <div>
    <nav>
      <h1><svg style="width: 24px;height: auto;top: 6px;position: relative;margin-right: 5px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#e2d372" d="M24 44 6 33.7V13.75L24 4l18 9.75V33.7Zm-5.7-24.9q1.15-1.15 2.625-1.875Q22.4 16.5 24 16.5t3.075.725q1.475.725 2.625 1.875l7.65-4.5L24 7.5l-13.35 7.1Zm4.2 20.6v-8.35q-2.6-.7-4.3-2.7-1.7-2-1.7-4.65 0-.55.075-1.125t.275-1.125L9 17.1v14.85ZM24 28.5q1.9 0 3.2-1.3 1.3-1.3 1.3-3.2 0-1.9-1.3-3.2-1.3-1.3-3.2-1.3-1.9 0-3.2 1.3-1.3 1.3-1.3 3.2 0 1.9 1.3 3.2 1.3 1.3 3.2 1.3Zm1.5 11.2L39 31.95V17.1l-7.85 4.65q.2.55.275 1.125.075.575.075 1.125 0 2.65-1.7 4.65-1.7 2-4.3 2.7Z"/></svg>Design Tokens Generator</h1>
      <div class="top-actions">
        <a href="https://www.leniolabs.com/services/" style="background: transparent;border: 2px solid #e1d472;color:#e1d472;">Hire our Team!</a>

        <button style="opacity: 0.5;background: transparent;border: 2px solid #54c4c9;color:#54c4c9;">Share URL</button>

        <button style="opacity: 0.5;background:#54c4c9;border: 2px solid #54c4c9">Download Tokens</button>
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

      <div class="content">
        <h2>{{ sets[selectedToken].title }}</h2>
      
          <div class="token-group">
           
            <button class="add-retoken" @click="addToken()"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M22.5 34h3v-8.5H34v-3h-8.5V14h-3v8.5H14v3h8.5ZM9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30ZM9 9v30V9Z"/></svg> New Token</button>

          </div>


        <div class="content-tokens" :key="componentKey">

          <div class="single-token" :id="token.$type" v-for="(token, e) in sets[selectedToken].tokens" :key="`token-${e}`">

            <div class="actions">
              <button class="add-token" > <svg style="opacity:0;" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none' stroke='transparent' stroke-width='8' stroke-linecap='round' stroke-linejoin='round'><line x1="20" y1="50" x2="80" y2="50" /> <line x1="50" y1="20" x2="50" y2="80" /></svg>
              <select name="tokentypes" @change="changeType($event,token)">
              <option v-for="type in tokenTypes" :selected="type === token.$type" :value="type" :key="`${type}`" >{{type}}</option>
            </select> </button>

              <button class="add-token" @click="addVariant(e)"> <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none' stroke='#0E1A27' stroke-width='8' stroke-linecap='round' stroke-linejoin='round'><line x1="20" y1="50" x2="80" y2="50" /> <line x1="50" y1="20" x2="50" y2="80" /></svg> Add</button>

              <!--<button><svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 48 48'><path d="M6 22.5V6h16.5v16.5ZM6 42V25.5h16.5V42Zm19.5-19.5V6H42v16.5Zm0 19.5V25.5H42V42ZM9 19.5h10.5V9H9Zm19.5 0H39V9H28.5Zm0 19.5H39V28.5H28.5ZM9 39h10.5V28.5H9Zm19.5-19.5Zm0 9Zm-9 0Zm0-9Z"/></svg></button>-->

              <button @click="$delete(sets[selectedToken].tokens, e)"><svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 48 48'><path d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z"/></svg></button>
            </div>

            <h3><component :is="`icons-${token.$type}`"/> <input type="text" v-model="token.$name" /> <i>({{ token.tokens.length }})</i></h3> 

            <div class="variants" v-if="token.tokens.length > 0">
              <div class="single-variant" v-for="(variant, a) in token.tokens" :key="`variant-${a}`">
                
                
                
                <div class="variant-example" v-if="token.$type === 'color' ">
                  <div class="color-cell" :style="`background:${variant.$value};border:1px solid #ddd;`">
                  </div>
                </div>
                <div class="variant-example" v-if="token.$type === 'opacity' " style="display: flex;align-items: center;justify-content: center;">
                  <div class="color-cell" :style="`opacity:${variant.$value};background:rgb(222, 0, 99);position:relative;height:75%;width:75%;`">
                  </div>                  
                  <div class="color-cell" :style="`background:linear-gradient(45deg,rgba(43,40,38,.1) 25%,transparent 0),linear-gradient(-45deg,rgba(43,40,38,.1) 25%,transparent 0),linear-gradient(45deg,transparent 75%,rgba(43,40,38,.1) 0),linear-gradient(-45deg,transparent 75%,rgba(43,40,38,.1) 0);background-size: 12px 12px;background-position: 0 0,0 6px,6px -6px,-6px 0;`">
                  </div>
                </div>
 
<!--                 <div class="variant-example" v-if="token.$type === 'lineHeight' ">
                  <div class="color-cell" :style="`line-height:${variant.$value};color:#888;display: flex;align-items: center;justify-content: center;`">
                    —<br>—
                  </div>                  
            
                </div> -->

                <div class="variant-example" v-if="token.$type === 'radius' " style="display: flex;align-items: center;justify-content: center;border:1px solid #ddd;">
                  <div class="color-cell" :style="`border-radius:${variant.$value};background:#DE0063;opacity: 0.25;height:75%;width:75%;position: relative;`">
                   </div>                  
            
                </div>

                <div class="variant-example" v-if="token.$type === 'spacing' " style="display: flex;align-items: center;justify-content: center;border:1px solid #ddd;">
                  <div class="color-cell" :style="`width:${variant.$value};background:#DE0063;opacity: 0.25;border-radius:0;height:width:${variant.$value};position: relative;`">
                   </div>                  
                </div>

                <div class="variant-example" v-if="token.$type === 'fontWeight' " style="display: flex;align-items: center;justify-content: center;border:1px solid #ddd;">
                  <div class="color-cell" :style="`font-weight:${variant.$value};color:#666;font-size:18px;position: relative;flex:1;max-width: max-content;max-height: 22px;`">
                   Aa</div>                  
                </div>

                <div class="variant-example" v-if="token.$type === 'letterSpacing' " style="display: flex;align-items: center;justify-content: center;border:1px solid #ddd;">
                  <div class="color-cell" :style="`letter-spacing:${variant.$value};color:#666;font-size:14px;position: relative;flex:1;max-width: max-content;max-height: 18px;`">
                   Abcde</div>                  
                </div>

                <div class="variant-example" v-if="token.$type === 'duration' " style="display: flex;align-items: center;justify-content: center;border:1px solid #ddd;">
                  <div class="color-cell" :style="`background:#DE0063;opacity: 0.25;height:25%;width:25%;border-radius:50%;position: relative;animation:run ${variant.$value} linear infinite alternate`">
                   </div>                  
            
                </div>

                <div class="variant-example" v-if="token.$type === 'shadow' " style="display: flex;align-items: center;justify-content: center;border:1px solid #ddd;">
                  <div class="color-cell" :style="`background:transparent;height:50%;width:50%;border-radius:0%;position: relative;box-shadow: ${variant.$value}`">
                   </div>                  
            
                </div>

                <div class="variant-example" v-if="token.$type === 'fontFamily' " style="display: flex;align-items: center;justify-content: center;border:1px solid #ddd;">
                  <div class="color-cell" :style="`font-family:${variant.$value};color:#666;font-size:18px;position: relative;flex:1;max-width: max-content;max-height: 18px;`">
                   Aa</div>                     
            
                </div>     
                <div class="variant-example" v-if="token.$type === 'fontSize' " style="display: flex;align-items: center;justify-content: center;border:1px solid #ddd;">
                  <div class="color-cell" :style="`font-size:${variant.$value};color:#666;position: relative;flex:1;max-width: max-content;height:initial`">
                   Aa</div>                     
            
                </div>            
                <div class="variant-example" v-if="token.$type === 'mediaQuery' " style="display: flex;align-items: center;justify-content: center;border:1px solid #ddd;">
                  <div class="color-cell" :style="`font-size:10px;color:#666;position: relative;flex:1;max-width: max-content;height:initial;`">
                  {{variant.$value}}</div>                     
            
                </div>                                              
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
            <div 
              v-for="(option, i) in exportOptions" 
              :key="`abc-${i}`"
              @click="selectedOption = i"
              :class="{'active': selectedOption === i}"
              >
              {{option}}
            </div>
          </div>
          <client-only>
            <pre>
              <code v-if="selectedOption === 0" v-highlight class="json" v-html="JSON.stringify(transformW3C(),null,2)">   </code>
              <code v-if="selectedOption === 1" v-highlight class="css" v-html="transformCSSvars('CSS')">   </code>
              <code v-if="selectedOption === 2" v-highlight class="scss" v-html="transformCSSvars('SASS')">   </code>
              <code v-if="selectedOption === 3" v-highlight class="css" v-html="transformDSP()">   </code>
            </pre>
          </client-only>

        </div>
      </div>
   </div>
</div>
 
</template>

<script>


 

export default {
  data() {
    return {
      componentKey: 0,
      selectedToken: 1,
      selectedOption: 0,
      tokenTypes: ['color','spacing','fontFamily','fontWeight','fontStyle','fontSize','duration','cubicBezier','letterSpacing','lineHeight','opacity','shadow','mediaQuery','z-index','radius','other'],
      exportOptions: ['W3C','CSS','SASS','DSP'],
      sets: [
        { 
          title: "Create New",
          tokens: [
 
          ]
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
              $type: "radius",
              $name: "Radius",
              "tokens": [
                {
                  $name: "radius-circle",
                  "$value": "50%"
                },                       
                {
                  $name: "radius-large",
                  "$value": "8px"
                },
                {
                  $name: "radius-small",
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
                  $name: "line-height-heading",
                  "$value": "1.25"
                },
                {
                  $name: "line-height-reset",
                  "$value": "1"
                },
                {
                  $name: "line-height-text",
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
      return "{ DSP Support coming soon! }"
    },        
    transformW3C() {
      var newObj = {}
      var copyObj = JSON.parse(JSON.stringify(this.sets[this.selectedToken]));
      for (const group of copyObj.tokens) {
        newObj[group.$name] = group
        var singleTokens = {}
        for (const item of group.tokens) {
          singleTokens[item.$name] = item
          delete singleTokens[item.$name]["$name"];
        }
        newObj[group.$name].tokens = singleTokens
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
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap');

@keyframes run {
    0% {
       transform: translateX(125%) translateY(-125%);
    }

    100% {
       transform: translateX(-125%) translateY(100%);
    }
}

::selection {
  background: rgba(172,206,247,0.25) ; /* WebKit/Blink Browsers */
}
::-moz-selection {
 background: rgba(172,206,247,0.25) ;}

html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}

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
}



.container {
  display: flex;
  padding-left: 220px;
  padding-right: 450px;
  padding-top: 60px;
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

  select {
    padding: 9px 15px;
    padding-left: 5px;
    max-width: 92px;
    border: 0;
    border-radius: 2px;
 
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


.variant-example {
  max-width: 40px;
  position: relative;
  overflow:hidden;
    border-radius: 2px;
  .color-cell {
    height: 100%;
    position: absolute;
    border-radius: 2px;

    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }  
}

.top-actions {
  position: absolute;
  top: 12px;
  right: 15px;
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
