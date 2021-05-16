/**
 * @author https://github.com/LEODPEN
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

function doBackWard(stack) {
    let curWin = chrome.windows.getCurrent().id;
    let curTab = chrome.tabs.getCurrent().id;
    // TODO 优化代码
    if (stack.empty()) return;
    var back = stack.pop();
    console.log(back);
    while (back.windowId == curWin 
    && back.tabId == curTab) {
        if (stack.empty()) return;
        back = stack.pop();
    }
    chrome.tabs.update(back.tabId, {active: true});
}

try{
    var latestTab;
    let url = chrome.runtime.getURL("srch-res.html");
    var stack = new fixedSizeStack(10);
    chrome.commands.onCommand.addListener(function (command) {
        if (command === 'do-search') {
            chrome.tabs.create({ url });
        }
        if (command === 'backward') {
            if (!stack.empty()) {
                latestTab = null;
            }
            doBackWard(stack);
        }
      });
    chrome.tabs.onActivated.addListener(function(activeInfo) {
        if (latestTab) {
            stack.push(latestTab);
        }
        latestTab = activeInfo;
    });
} catch(e) {
    // If tab was closed then just jump it.
    console.error(e);
}

