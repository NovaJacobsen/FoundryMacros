(()=>{"use strict";var t={d:(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{Base:()=>a,Checkbox:()=>u,Constant:()=>s,Dropdown:()=>f,Output:()=>h});var n={};t.r(n),t.d(n,{Test:()=>w,castBloodMagic:()=>v});var o={};t.r(o),t.d(o,{dialogs:()=>n,elements:()=>e});var r,l=function(){function t(t){var e=this,n=t.title,o=t.elements,r=t.buttons,l=t.template;this.buttons={},this.d="",this.title=n,this.elements=Object.values(o),this.elementKeys=Object.keys(o),this.html='<form id="ndia">'+this.elements.reduce((function(t,e){return e.apply(t)}),l)+"</form>",Object.entries(r).forEach((function(t){var n=t[0],o=t[1];o.default&&(e.d=n);var r=o.callback?function(t){return o.callback(e.extract(t))}:void 0;e.buttons[n]={icon:'<i class="fas fa-'+o.icon+'"></i>',label:o.label,callback:r}}));var a=function(t){return function(){return e.elements.forEach((function(n){var o=e.extract(t);try{n.update(t,o)}catch(n){console.log("Failed to update: "+n.key+" with:",o)}}))}};this.dialog=new Dialog({title:this.title,content:this.html,buttons:this.buttons,default:this.d,render:function(t){t.find("#ndia")[0].addEventListener("change",a(t),!0),a(t)()}})}return t.prototype.render=function(){this.dialog.render(!0)},t.prototype.extract=function(t){var e=this;return Object.fromEntries(this.elements.map((function(n,o){return[e.elementKeys[o],n.extract(t)]})))},t}(),a=function(){function t(t){this.injectHtml="",this.key=t}return t.prototype.update=function(t,e){},t.prototype.apply=function(t){return t.replaceAll("#{"+this.key+"}",this.injectHtml)},t.prototype.getElement=function(t){return t.find("#"+this.key)[0]},t}(),i=(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),u=function(t){function e(e,n){var o=t.call(this,e)||this;return o.injectHtml="<div> "+(n.label?'<label for="'+o.key+'">'+n.label+"</label>":"")+' <input\n        type=checkbox\n        id="'+o.key+'"\n        name="'+o.key+'"\n        '+(n.default?"checked":"")+"\n      ></input>\n    </div>",o}return i(e,t),e.prototype.extract=function(t){return this.getElement(t).checked},e}(a),c=function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),s=function(t){function e(e,n){var o=t.call(this,e)||this;return o.value=n,o}return c(e,t),e.prototype.apply=function(t){return t},e.prototype.extract=function(t){return this.value},e}(a),p=function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),f=function(t){function e(e,n){var o=t.call(this,e)||this;return o.parms=n,o.injectHtml="\n    "+(o.parms.label?'<label for="'+o.key+'">'+o.parms.label+"</label>":"")+'\n    <select id="'+o.key+'" name="'+o.key+'">'+o.parms.options.map((function(t){return"<option>"+t.label+"</option>"}))+"</select>\n    ",o}return p(e,t),e.prototype.extract=function(t){return this.parms.options[this.getElement(t).selectedIndex].value},e}(a),d=function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),h=function(t){function e(e,n){var o=t.call(this,e)||this;return o.update=function(t,e){o.updateData&&(o.value=o.updateData(e),o.getElement(t).value=o.render(o.value))},o.updateData=n.update,o.render=n.render||o.interpolate,o.label=n.label,o.value=n.default,o.injectHtml="<div>\n    "+(o.label?'<label for="'+o.key+'">'+o.label+"</label>":"")+'\n    <output id="'+o.key+'"></output>\n    </div>',o}return d(e,t),e.prototype.interpolate=function(t){return t+""},e.prototype.extract=function(){return this.value},e}(a),y=[4,8,12,16,20,25,30,35,40],b={costs:new s("Costs",y),level:new f("Level",{label:"Spell Level:",options:y.map((function(t,e){return{label:""+(e+1),value:e+1}}))}),bp:new u("BloodPoints",{label:"Spend blood point to reduce cost?"}),bpCost:new h("BloodCost",{label:"Blood point:",update:function(t){return t.bp?1:0},default:0}),hpCost:new h("HealthCost",{label:"HP:",update:function(t){return t.costs[t.level-1]-3*t.bpCost},default:0}),cCost:new h("CorruptionCost",{label:"Corruption:",update:function(t){return Math.floor(t.hpCost/2)},default:0}),chat:new u("SendToChat",{label:"Send to chat?",default:!0}),update:new u("Update",{label:"Send updates to character sheet?",default:!0})},v=function(t){var e,n;return new l({title:"Blood Magic Cost",elements:b,buttons:{confirm:{icon:"skull",label:"Cast!",callback:(n=t||(null===(e=game.user)||void 0===e?void 0:e.character),function(t){t.update&&n&&n.update({data:{attributes:{hp:{value:n.data.data.attributes.hp.value-t.hpCost}}}}),t.chat&&ChatMessage.create({user:game.user._id,content:(null==n?void 0:n.name)+" cast a blood magic spell at level "+t.level+" by spending "+t.hpCost+" health and "+t.bpCost+" blood points",type:CONST.CHAT_MESSAGE_TYPES.EMOTE})})}},template:"<h1>Select spell level</h1>\n#{Level}\n\n#{BloodPoints}\n\n<h2>Costs:</h2>\n#{BloodCost}\n#{HealthCost}\n#{CorruptionCost}\n\n<h2>Options:</h2>\n#{SendToChat} #{Update}\n"})},m={yay:{default:!0,label:"The default button"},echo:{default:!0,icon:"play",label:"Echo!",callback:function(t){console.log("TheBox: "+(t.theBox?"yes":"no"))}}},_={theBox:new u("theBox",{label:"This is a test checkbox"})},w=new l({title:"A test",elements:_,buttons:m,template:""});Hooks.once("ready",(function(){window.novaAPI=o,setTimeout((function(){return $(".notification:contains(requires a minimum screen resolution)").hide()}))}))})();