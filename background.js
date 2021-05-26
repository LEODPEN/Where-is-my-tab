/**
 * @author https://github.com/LEODPEN
 * date: 2021/05/26
 * @description new version using linked list.
 */

 class PNode {
    windowId;tabId;next;pre;cur;
    constructor(windowId, tabId) {
        this.windowId = windowId;
        this.tabId = tabId;
        this.next = null;
        this.pre = null;
        this.cur = this.head;
    }
 }

 class LinkedList {
    head;tail;windowId;
    constructor(windowId) {
        this.windowId = windowId;
        this.head = new PNode(-1, -1);
        this.tail = new PNode(-1, -1);
        this.head.next = this.tail;
        this.tail.pre = this.head;
    }

    empty() {
        return this.head.next == this.tail;
    }
    
    clear() {
        this.head.next = this.tail;
        this.tail.pre = this.head;
        this,cur = this.head;
    }

    /**
     * @param threshold  > 10
     */
    deleteSomeWhenSizeLargerThan(threshold) {
        var sz = 0, randomNum = Math.round(Math.random()*(threshold/2));
        randomNum = randomNum >= 2 ? randomNum : 2;
        var node = this.head;
        var randomNode = null;
        while (node.next != this.tail) {
            node = node.next;
            sz++;
            if (sz == randomNum) {
                randomNode = node;
            }
        }
        if (sz > threshold) {
            nodeAfterHead = this.head.next;
            nodeAfterHead.pre = null;

            this.head.next = randomNode;
            randomNode.pre = this.head;
        }
    }

    /**
     * @param  e 待插入element(new)
     */
    add(e) {
        if (!e) {
            return;
        }

        if (!this.empty()) {
            nodeBeforeTail = this.tail.pre;
            nodeAfterCur = this.cur.next;

            nodeBeforeTail.next = null;
            nodeAfterCur.pre = null;
        }
        
        this.cur.next = e;
        e.pre = this.cur;
        e.next = this.tail;
        this.tail.pre = e;

        this.cur = this.cur.next; // 即为e

        // 保证检测概率更大
        if (Math.random() <= 0.5) {
            this.deleteSomeWhenSizeLargerThan(20);
        }
    }

    /**
     * 如果返回为null，则说明cur未变，不跳转
     * @returns 
     */
    loadBackard() {
        if (this.empty()) return null;
        var r = this.cur;
        var l = this.cur.pre;
        while (l != this.head && !judgeExistence(l.windowId, l.tabId)) {
            l = l.pre;
        }
        if (l != r.pre) {
            l.next = r;
            r.pre = l;
        }
        if (l == this.head) {
            return null;
        } else {
            this.cur = l;
            return this.cur;
        }
    }

    /**
     * 如果返回为null，则说明cur未变，不跳转
     * @returns 
     */
    loadForward() {
        if (this.empty()) return null;
        var l = this.cur;
        var r = this.cur.next;
        while(r != this.tail && !judgeExistence(r.windowId, r.tabId)) {
            r = r.next;
        }
        if (r != l.next) {
            l.next = r;
            r.pre = l;
        }
        if (r == this.tail) {
            return null;
        } else {
            this.cur = r;
            return this.cur;
        }
    }
}

function judgeExistence(windowId, tabId) {
    try {
         var tab = chrome.tabs.get(tabId);
         if (!tab || tab.windowId != windowId) {
             return false;
         }
    } catch(e) {
        return false;
    }
    return true;
}

function doBackWard(lk) {
    var back;
    if (!lk || !(back = lk.loadBackard()) || back.windowId != lk.windowId) {
        return;
    }
    chrome.tabs.update(back.tabId, {active: true});
}

function doForward(lk) {
    var forw;
    if (!lk || !(forw = lk.loadForward()) || forw.windowId != lk.windowId) {
        return;
    }
    chrome.tabs.update(forw.tabId, {active: true});
}

try{
    let url = chrome.runtime.getURL("srch-res.html");
    var map = new Map();
    chrome.commands.onCommand.addListener(function (command) {
            if (command === 'do-search-in-new-tab') {
                // 当前自动禁用，要开启需要到快捷键设置自由添加
                chrome.tabs.create({ url });
            }
            if (command === 'backward') {
                chrome.windows.getCurrent(function(cw) {
                    var curWin = cw.id;
                    var lk;
                    if (!map.has(curWin)) {
                        // 初始时刻
                        return;
                    } else {
                        lk = map.get(curWin);
                    }
                    doBackWard(lk);
                });
            if (command === 'forward') {
                chrome.windows.getCurrent(function(cw) {
                    var curWin = cw.id;
                    var lk;
                    if (!map.has(curWin)) {
                        // 初始时刻
                        return;
                    } else {
                        lk = map.get(curWin);
                    }
                    doForWard(map, cw.id);
                });
            }
        }
      });
    chrome.tabs.onActivated.addListener(function(activeInfo) {

        var windowId = activeInfo.windowId;
        var tabId = activeInfo.tabId;
        var lk;
        
        if (map.has(curWin)) {
            lk = map.get(curWin);
            if (!lk || lk.windowId != curWin) {
                lk.clear();
                lk = new LinkedList(curWin);
                map.set(curWin, lk);
            }
        } else {
            lk = new LinkedList(curWin);
            map.set(curWin, lk);
        }
        if (lk.cur.windowId == windowId && lk.cur.tabId == tabId) {
            return;
        } else {
            var curNode = new PNode(windowId, tabId);
            lk.add(curNode);
        }
    });
} catch(e) {
    // If tab was closed then just jump it.
    console.error(e);
}