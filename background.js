/**
 * @author https://github.com/LEODPEN
 * date: 2021/05
 */

 class fixedSizeStack {
    
    constructor(sz) {
        this.len = sz;
        this.data = [];
        this.curSize = 0;
    }

    empty() {
        return this.curSize <= 0;
    }

    full() {
        return this.curSize >= this.len;
    }
    
    clear() {
        delete this.data;
        this.data = [];
        this.curSize = 0;
    }

    push(e) {
        if (this.full()) {
            this.data.shift();
            this.curSize--;
        }
        var newCurLen = this.data.push(e);
        this.curSize = newCurLen >= this.len ? this.len : newCurLen;
    }
    
    pop() {
        if (this.empty()) {
            return;
        }
        var res = this.data.pop(); // 最后一个
        this.curSize = this.curSize <= 0 ? 0 : --this.curSize;
        return res;
    }
}

function doBackWard(stack, curWin) {
    if (stack.empty()) return;
    chrome.tabs.getCurrent(function(curTab) {
        // check again
        var back;
        while((back = stack.pop()).tabId == curTab
            && back.windowId == curWIn);
        if (back.windowId != curWin) return;
        chrome.tabs.update(back.tabId, {active: true});
    });
}

try{
    var latestTabMap = new Map();
    let url = chrome.runtime.getURL("srch-res.html");
    var stackMap = new Map();
    chrome.commands.onCommand.addListener(function (command) {
            if (command === 'do-search-in-new-tab') {
                chrome.tabs.create({ url });
            }
            if (command === 'backward') {
            chrome.windows.getCurrent(function(cw) {
                var stack;
                var curWin = cw.id;
                if (stackMap.has(curWin)) {
                    stack = stackMap.get(curWin);
                } else {
                    stack = new fixedSizeStack(10);
                    stackMap.set(curWin, stack);
                }
                if (!stack.empty() && latestTabMap.get(curWin)) {
                    latestTabMap.set(curWin, null);
                }
                doBackWard(stack, curWin);
            });
            if (command === 'forward') {
            }
        }
      });
    chrome.tabs.onActivated.addListener(function(activeInfo) {

        chrome.windows.getCurrent(function(cw){

            var curWin = cw.id;
            var stack;
            var latestTab;
            if (stackMap.has(curWin)) {
                stack = stackMap.get(curWin);
            } else {
                stack = new fixedSizeStack(10);
                stackMap.set(curWin, stack);
            }
            if ((latestTab = latestTabMap.get(curWin))) {
                stack.push(latestTab);
            }
            latestTabMap.set(curWin, activeInfo);
        });
    });
} catch(e) {
    // If tab was closed then just jump it.
    console.error(e);
}

