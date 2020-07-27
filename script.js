const NAME = "John";
const WELCOME_MESSAGE_TEMPLATE = ["night", "morning", "afternoon", "evening"];

// All shortcuts are in a `SHORTCUT_STARTER+shortcutKey` format. 
// So, for example, pressing `tab+q` would redirect you to https://google.com/?q=q
const SHORTCUT_STARTER = 'tab' 

// How much time (in milliseconds) you have to press shortcutKey after pressing SHORTCUT_STARTER.
// Also change --SHORTCUT_TIMEOUT in styles.css if you change this option.
const SHORTCUT_TIMEOUT = 1500;

// The groups of links are generated from this object. Edit it to edit the page's contents.
// shortcutKey must hold an all-lowercase single button. Theoretically should work with values like `esc` and `f1`,
// but intended to be used with just regular latin letters.
const MASTER_MAP = [
    {
        "groupName": "Development",
        "items":[
            {"name": "Udemy", "shortcutKey": "q", "url": "https://www.udemy.com/?q=q"},
            {"name": "codeSignal", "shortcutKey": "w", "url": "https://codesignal.com/?q=w"},
            {"name": "leetCode", "shortcutKey": "e", "url": "https://leetcode.com/?q=e"},
            {"name": "Github", "shortcutKey": "r", "url": "https://github.com/?q=r"},
            {"name": "StackOverflow", "shortcutKey": "t", "url": "https://stackoverflow.com/?q=t"},
            {"name": "Itch.io", "shortcutKey": "y", "url": "https://itch.io/?q=y"}

        ]
    },
    {
        "groupName": "Work",
        "items":[
            {"name": "Kibana", "shortcutKey": "a", "url": "https://63.241.116.144:8001/app/kibana#/dashboards?notFound=dashboard&_g=(filters:!())?q=a"},
            {"name": "MS Office", "shortcutKey": "s", "url": "https://www.office.com/?auth=2&home=1?q=s"},
            {"name": "Ribbon Portal", "shortcutKey": "d", "url": "https://portal.att-ucservices.com/portal3/index.html#/?gp=58dd812d72f99&session_timeout=1?q=d"},
            {"name": "Moogsoft", "shortcutKey": "f", "url": "https://atlas.moogsoft.com/login/?q=f"},
            {"name": "Asims Wiki", "shortcutKey": "g", "url": "https://wikijs.aadya.tech/?q=g"}
        ]
    },
    {
        "groupName": "Personal",
        "items":[
            {"name": "Youtube", "shortcutKey": "z", "url": "https://youtube.com/?q=z"},
            {"name": "Hulu", "shortcutKey": "x", "url": "https://Hulu.com/?q=x"},
            {"name": "Netflix", "shortcutKey": "c", "url": "https://netflix.com/?q=c"},
            {"name": "Hacker News", "shortcutKey": "v", "url": "https://thehackernews.com/?q=v"},
            {"name": "Reddit", "shortcutKey": "b", "url": "https://reddit.com/?q=b"},
            {"name": "Wallhaven", "shortcutKey": "n", "url": "https://wallhaven.cc/?q=n"}
        ]
    }
]

let $container = document.getElementById("content");
let getUrl = {};

let $shortcutDisplayList = document.getElementsByClassName("shortcut");
let listeningForShortcut = false;
let listenerTimeout;

function setupWelcomeMessage(){
    let curHours = new Date().getHours();
    curHours = Math.floor(curHours/6); // Simply dividing current hours by 6 proves to be a good enough aproximation.
    if (curHours == 4) curHours = 3;
    let welcome = "Good " + WELCOME_MESSAGE_TEMPLATE[curHours] + ", " + NAME;
    document.getElementById("welcome-string").innerHTML = welcome;
}

function setupGroups(){
    for (let i = 0; i < MASTER_MAP.length; i++){
        let curGroupData = MASTER_MAP[i];

        let group = document.createElement("div");
        group.className = "group";
        $container.appendChild(group);

        let header = document.createElement("h1");
        header.innerHTML = curGroupData.groupName;
        group.appendChild(header);

        for (let j = 0; j < curGroupData.items.length; j++){
            let curItemData = curGroupData.items[j];

            let pContainer = document.createElement("p");
            group.appendChild(pContainer);

            let link = document.createElement("a");
            link.innerHTML = curItemData.name;
            link.setAttribute("href", curItemData.url);
            pContainer.appendChild(link);

            let shortcutDisplay = document.createElement("span");
            shortcutDisplay.innerHTML = curItemData.shortcutKey;
            shortcutDisplay.className = "shortcut";
            shortcutDisplay.style.animation = "none";
            pContainer.appendChild(shortcutDisplay);

            getUrl[curItemData.shortcutKey] = curItemData.url
        }
    }
}

function shortcutListener(e) {
    let key = e.key.toLowerCase();

    if (listeningForShortcut && getUrl.hasOwnProperty(key)){
        window.location = getUrl[key];
    }

    if (key === SHORTCUT_STARTER) {
        clearTimeout(listenerTimeout);
        listeningForShortcut = true;

        // Animation reset
        for (let i = 0; i < $shortcutDisplayList.length; i++){
            $shortcutDisplayList[i].style.animation = "none";
            setTimeout(function() { $shortcutDisplayList[i].style.animation = ''; }, 10);
        }

        listenerTimeout = setTimeout(function(){ listeningForShortcut = false; }, SHORTCUT_TIMEOUT);
    }
}

function main(){
    //setupWelcomeMessage();
    setupGroups();
    document.addEventListener('keyup', shortcutListener, false);
}

main();
