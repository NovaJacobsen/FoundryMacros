const costs = [4,8,12,16,20,25,30,35,40];

const castBloodMagic = (params) => {
  let me = game.user.character
  
  let level = params.level
  let bpCost = params.bloodPoints || 0
  let sendToChat = !!params.sendToChat
  let updateSheet = !!params.updateSheet
 
  let hpCost = costs[level] - (3*bpCost)
  let cCost = Math.floor(hpCost/2)
  

  if(sendToChat) {
    ChatMessage.create({
      user: game.user._id,
      content: `${me.name} cast a blood magic spell at level ${level} by spending ${hpCost} health and ${bpCost} blood points`,
      type: CONST.CHAT_MESSAGE_TYPES.EMOTE
    });
  }


  if(updateSheet) {
    let bp = me.data.data.resources.secondary
    let c = me.data.data.resources.primary; c.value ||= 0
    let hp = me.data.data.attributes.hp
    bp.value -= bpCost
    c.value += cCost
    hp.value -= hpCost
    me.update(me.data)
  }
}


const showLevelDialog = () => {
  let options = costs.map((val, index) => `<option>${index+1}</option>`).join("\n");
  console.log({options})
  
  
  return new Dialog({
    title: "Blood magic cost",
    content: `
<h1>Select spell level</h1>

<form>
  <div>
    <label for="level">Spell level: </label>
    <select id="level" name="level" required>${options}</select>
  </div>

  <div>
    <label for="bloodPoint">Spend blood point to reduce cost?</label>
    <input type="checkbox" id="bloodPoint" name="bloodPoint">
  </div>
  
  <div>
    <label for="toChat">Send message to chat?</label>
    <input type="checkbox" id="toChat" name="toChat" checked>
  </div>
  <div>
    <label for="update">Update character sheet?</label>
    <input type="checkbox" id="update" name="update" checked>
  </div>

</form>
`,
    buttons: {
      confirm:{
        icon: '<i class="fas fa-skull"></i>',
        label: "Cast!",
        callback: html => {
          
          castBloodMagic({
            level: html.find('#level')[0].selectedIndex+1,
            bloodPoints: html.find('#bloodPoint')[0].checked ? 1 : 0,
            sendToChat: html.find('#toChat')[0].checked,
            updateSheet: html.find('#update')[0].checked,
          })
        }
      }
    }
  }).render(true);
}

showLevelDialog();