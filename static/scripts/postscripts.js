const quotes = [
    "Nothing's better than learning on your own pace.",
    "Every new thing will always have its misuse.",
    "No system is secure.",
    "Third-party antivirus software is unnecessary unless otherwise.",
    "A.I. is cool and all, but is it really a necessity to have it everywhere?",
    "If it ain't broke, don't fix it.",
    "Capitalism on the wrong ways possible has been an ongoing thing.",
    "Linux is powerful, but less accessible to a new user. Let's fix that.",
    "F.O.S.S. will forever be the best thing ever made.",
    "Modern mobile games are becoming wallet miners. Be careful.",
    "If you think it's harmless, think again. Be safe than sorry.",
    "The best antivirus is common sense.",
    "You should check your account passwords at least once a month.",
    "Looking back, it was a lot simplier. Now, it's a whole lot of baloney.",
    "I use Arch unironically.",
    "Windows Phone may be dead, but it's still thriving with its community.",
    "Assembly is a nightmare.",
    "Why are we making phones slower with garbage software? Get it out!",
    "I wish we can a whole year where all companies stop listening to their stakeholders.",
    "Always support Indie development, software or games. They deserve it at least. :)",
    "Tech corporates try not to make a bad decision (impossible) (gone wrong)",
    "Tech is growing so fast, and becoming obsolete at the same time.",
    "Windows 11 is Windows 10 but with all the furniture and paint replaced. Meanwhile the pipe system...",
    "Hoping that not all Sci-Fi tech becomes a reality. We are NOT ready for Terminator IRL.",
    "I miss Yahoo! Messenger 9.",
    "You should do some stargazing once. It's a beautiful experience.",
    "Of all places you'd want to be in, you'd most likely want to end up on top of a mountain, screaming out all the pain.",
    "Never give up. Keep going. All your efforts will be rewarded in the most unexpected ways possible. Trust.",
    "Remember to take a break. :)",
    "We all make mistakes. So stand up, learn from it, and move on.",
    "Villains aren't born. They're made. And I so hope that it doesn't happen again, because it's already possible.",
    "Be content with whatever you have. :)",
    "As long as prices increase unfairly, piracy will still continue on as the alternative option.",
    "Nothing is hard to do, really. You just need to know and understand what it is."
];

var i = 0;

const animateLoader = setInterval(() => {
    const sym = {0: "|", 1: "/", 2: "-", 3: "\\"};

    document.querySelector(".footer").innerHTML = "[" + sym[i % 4] + "] Loading...";
    i++;
}, 100);

setTimeout( () =>
    {
        clearInterval(animateLoader);
        document.querySelector(".footer").innerHTML = "[>] " + quotes[Math.ceil(Math.random() * quotes.length)];
    },
    3000
);

document.querySelector("#github").addEventListener("click", () => document.querySelector("#github a").click());
document.querySelector("#github").addEventListener("focus", () => document.querySelector("#github a"));
document.querySelector("#ios").addEventListener("click", () => document.querySelector("#ios a").click());
document.querySelector("#rw").addEventListener("click", () => document.querySelector("#rw a").click());
document.querySelector("#more").addEventListener("click", () => document.querySelector("#more a").click());
document.querySelector("#info").addEventListener("click", () => document.querySelector("#info a").click());

document.addEventListener("keydown", (e) => { if (e.key === "ArrowDown") { if (document.activeElement.classList.contains("card")) document.activeElement.nextElementSibling?.focus(); else document.querySelector("#github").focus(); } });
document.addEventListener("keydown", (e) => { if (e.key === "ArrowUp") { if (document.activeElement.classList.contains("card")) document.activeElement.previousElementSibling?.focus(); else document.querySelector("#info").focus(); } });
document.addEventListener("keydown", (e) => e.key === "ArrowRight" && document.activeElement.classList.contains("card") && document.activeElement.click());