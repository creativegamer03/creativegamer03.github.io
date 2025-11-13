// main.js

function isMobile() {
	// Credit to Timothy Huang for code, and Oskar Codes for shortening it.
	// https://dev.to/timhuang/a-simple-way-to-detect-if-browser-is-on-a-mobile-device-with-javascript-44j3#comment-1f5ch
	// 
	// Credit to Blackbam for touchscreen detection.
	// https://stackoverflow.com/a/52855084
	//
	// Modified for this webpage exclusively.
	
	if (/Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		if (navigator.userAgentData.mobile && window.matchMedia("(pointer: coarse)").matches) {
			return 1 // Mobile (Smartphones)
		}
		else if (navigator.userAgentData.mobile && !window.matchMedia("(pointer: coarse)").matches) {
			return 2 // Mobile (Basic Phones)
		}
		else if (!navigator.userAgentData.mobile && window.matchMedia("(pointer: coarse)")) {
			return 3 // Mobile (IEMobile/Safari). navigator.userAgentData.mobile returns false for IEMobile and Safari because it is unsupported.
		}
		else {
			return 4
		}
	}
	else {
		return 0
	}
	// return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

function debugInfo() {
	switch (isMobile()) {
		case 1:
			return "isMobile: Yes (Smartphone)"
			break
		case 2:
			return "isMobile: Yes (Basic phone)"
			break
		case 3:
			return "isMobile: Yes (IE Mobile 11 or older/Safari)"
			break
		case 4:
			return "isMobile: Yes (Old Browser)"
			break
		default:
			return "isMobile: No (Desktop/Tablet)"
			break
	}
}

let check = navigator.userAgentData.mobile;

console.log("isMobile: " + isMobile());
console.log("check: " + check);