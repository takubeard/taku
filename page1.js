function getRandomName() {
    const adjs = ["red","sweet","dorrt","lions","bark","the","princess","boris","baldr"];
    const nouns = ["velvet","sparkle","dorrt","blood","fist","jester","sweetsparkle","blunderbuss","barkfist","battlebeard"];
    return (
      adjs[Math.floor(Math.random() * adjs.length)] +
      "_" +
      nouns[Math.floor(Math.random() * nouns.length)]
    );
}
    
   function getRandomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

const CHANNEL_ID = 'uXrlQYeYAnCJdB6h';
const drone = new ScaleDrone(CHANNEL_ID, {
 data: { // Will be sent out as clientData via events
   name: getRandomName(),
   color: getRandomColor(),
 },
});

const DOM = {
    membersCount: document.querySelector('.members-count'),
    membersList: document.querySelector('.members-list'),
    messages: document.querySelector('.messages'),
    input: document.querySelector('.message-form__input'),
    form: document.querySelector('.message-form'),
   };
    
   function createMemberElement(member) {
    const { name, color } = member.clientData;
    const el = document.createElement('div');
    el.appendChild(document.createTextNode(name));
    el.className = 'member';
    el.style.color = color;
    return el;
   }
    
   function updateMembersDOM() {
    DOM.membersCount.innerText = `${members.length} users in room:`;
    DOM.membersList.innerHTML = '';
    members.forEach(member =>
      DOM.membersList.appendChild(createMemberElement(member))
    );
   }
    
   function createMessageElement(text, member) {
    const el = document.createElement('div');
    el.appendChild(createMemberElement(member));
    el.appendChild(document.createTextNode(text));
    el.className = 'message';
    return el;
   }
    
   function addMessageToListDOM(text, member) {
    const el = DOM.messages;
    const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;
    el.appendChild(createMessageElement(text, member));
    if (wasTop) {
      el.scrollTop = el.scrollHeight - el.clientHeight;
    }
}

drone.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully connected to Scaledrone');
    
    const room = drone.subscribe('observable-room');
    room.on('open', error => {
      if (error) {
        return console.error(error);
      }
      console.log('Successfully joined room');
    });

    // List of currently online members, emitted once
    room.on('members', m => {
        members = m;
        updateMembersDOM(); 
        me = members.find(function(member) {
            return member.id === drone.clientId;
        });
        // document.getElementById('yourNameParagraph').appendChild(document.createTextNode(me.clientData.name.fontcolor(me.clientData.color)));
        var paragraph = document.getElementById('yourNameParagraph'); // dis part gets the paragraph from html
        paragraph.appendChild(document.createTextNode(me.clientData.name)); // dis adds the following text to paragraph
        paragraph.style.color = me.clientData.color
    });
    
    // User joined the room
    room.on('member_join', member => {
        members.push(member);
        updateMembersDOM(); 
    });
    
    // User left the room
    room.on('member_leave', ({id}) => {
        const index = members.findIndex(member => member.id === id);
        members.splice(index, 1);
        updateMembersDOM(); 
    });

    room.on('data', (text, member) => {
        if (member) {
            addMessageToListDOM(text, member);
            if (member.id != me.id) {
              notif.play()
            }
            if (text == "!music") {
              playPause()
            }
        } else {
          // Message is from server
        }
    });

});

let members = [];

DOM.form.addEventListener('submit', sendMessage);
 
function sendMessage() {
 const value = DOM.input.value;
 if (value === '') {
   return;
 }
 DOM.input.value = '';
 drone.publish({
   room: 'observable-room',
   message: value,
 });
 console.log('Your ID is ' + me.id)
 console.log('Your name is ' + me.clientData.name)
 console.log('Your color is ' + me.clientData.color)
}

let playing = false;
function playPause() {
  if (playing) {
    console.log("wee")
    music.pause()
    playing = false;
  } else {
    console.log("woo")
    music.play()
    playing = true;
  }
}