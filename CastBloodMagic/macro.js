const costs = [4,8,12,16,20,25,30,35,40];

const cost = (data) => {
  let bpCost = data.bloodPoints || 0
  let hpCost = costs[data.level - 1] - (3*bpCost)
  let cCost = Math.floor(hpCost/2)
  
  return {
    hpCost,
    bpCost,
    cCost 
  }
}

const castBloodMagic = (params) => {
  let me = game.user.character
  let c = cost(params)
  

  if(params.sendToChat) {
    ChatMessage.create({
      user: game.user._id,
      content: `${me.name} cast a blood magic spell at level ${params.level} by spending ${c.hpCost} health and ${c.bpCost} blood points`,
      type: CONST.CHAT_MESSAGE_TYPES.EMOTE
    });
  }

  if(params.updateSheet) {
    let bp = me.data.data.resources.secondary
    let c = me.data.data.resources.primary; c.value ||= 0
    let hp = me.data.data.attributes.hp
    bp.value -= c.bpCost
    c.value += c.cCost
    hp.value -= c.hpCost
    me.update(me.data)
  }
}

const showLevelDialog = () => {
  let options = costs.map((val, index) => `<option>${index+1}</option>`).join("\n");
  
  const getParam = (html) => {
    console.log(html.find('#level')[0].selectedIndex+1)
    return {
      level: (html.find('#level')[0].selectedIndex+1),
      bloodPoints: (html.find('#bloodPoint')[0].checked ? 1 : 0),
      sendToChat: (html.find('#toChat')[0].checked),
      updateSheet: (html.find('#update')[0].checked)
    };
  }
  
  
  return new Dialog({
    title: "Blood Magic Cost",
    content: `
<h1>Select spell level</h1>

<form id="castForm">
  <div>
    <label for="level">Spell level: </label>
    <select id="level" name="level" required>${options}</select>
  </div>

  <div>
    <label for="bloodPoint">Spend blood point to reduce cost?</label>
    <input type="checkbox" id="bloodPoint" name="bloodPoint">
  </div>

  <h2>costs:</h2>
  <div>
    <label for="bloodCost">Blood Points: </label>
    <output id="bloodCost"></output>
  </div>
    <div>
    <label for="healthCost">HP: </label>
    <output id="healthCost"></output>
  </div>
    <div>
    <label for="corruptionCost">Corruption: </label>
    <output id="corruptionCost"></output>
  </div>
  
  <h2>options:</h2>
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
      confirm: {
        icon: '<i class="fas fa-skull"></i>',
        label: "Cast!",
        callback: html => {
          castBloodMagic(getParam(html))
        }
      }
    },
    render: html => {
      let form = html.find("#castForm")[0];
      let c = cost(getParam(html));
      let updateOutput = () => {
        html.find("#bloodCost")[0].value = c.bpCost
        html.find("#healthCost")[0].value = c.hpCost
        html.find("#corruptionCost")[0].value = c.cCost
      };
      form.oninput = updateOutput;
      updateOutput();
    },
  }).render(true);
}

showLevelDialog();
