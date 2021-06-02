/**
 * @author https://github.com/LEODPEN
 * date: 2021/05/26
 * @description new version using linked list.
 */

 class PNode {
    windowId;tabId;next;pre;
    constructor(windowId, tabId) {
        this.windowId = windowId;
        this.tabId = tabId;
        this.next = null;
        this.pre = null;
    }
 }

 class LinkedList {
    head;tail;windowId;cur;
    constructor(windowId) {
        this.windowId = windowId;
        this.head = new PNode(-1, -1);
        this.tail = new PNode(-1, -1);
        this.head.next = this.tail;
        this.tail.pre = this.head;
        this.cur = this.head;
    }

    empty() {
        return this.head.next == this.tail;
    }
    
    clear() {
        this.head.next = this.tail;
        this.tail.pre = this.head;
        this.cur = this.head;
    }

    deleteOne(node) {
        if (!node || node == this.head || node == this.tail) {
            return;
        }
        var p = node.pre;
        var n = node.next;
        p.next = n;
        n.pre = p;
        node.pre = null;
        node.next = null;
        node = null;
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
            var nodeAfterHead = this.head.next;
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
            var nodeBeforeTail = this.tail.pre;
            var nodeAfterCur = this.cur.next;

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
    loadBackard(ifDelete) {
        if (this.empty()) return null;
        var r = this.cur;
        var l = this.cur.pre;
        // while (l != this.head && 
        //     (! (judgeExistence(l.windowId, l.tabId))
        //         || (l.windowId == l.pre.windowId 
        //             && l.tabId == l.pre.tabId))) {
        //     l = l.pre;
        // }
        while (l != this.head && l.tabId == l.pre.tabId) {
            l.pre = l.pre.pre;
            l.pre.next = l;
            l = l.pre;
        }
        if (l != r.pre) {
            l.next = r;
            r.pre = l;
        }
        if (ifDelete == true) {
            this.deleteOne(r);
        }
        if (l == this.head) {
            if (r.next == null || r.pre == null) {
                this.cur = l;
            }
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
    loadForward(ifDelete) {
        if (this.empty()) return null;
        var l = this.cur;
        var r = this.cur.next;
        // while(r != this.tail && 
        //         (! (judgeExistence(r.windowId, r.tabId))
        //             || (r.windowId == r.next.windowId
        //                 && r.tabId == r.next.tabId))) {
        //     r = r.next;
        // }
        while (r != this.tail && r.tabId == r.next.tabId) {
            r.next = r.next.next;
            r.next.pre = r;
            l = l.pre;
        }
        if (r != l.next) {
            l.next = r;
            r.pre = l;
        }
        if(ifDelete == true) {
            this.deleteOne(l);
        }
        if (r == this.tail) {
            if (l.next == null || l.pre == null) {
                this.cur = r.pre;
            }
            return null;
        } else {
            this.cur = r;
            return this.cur;
        }
    }
}



async function judgeExistence(windowId, tabId) {
    var res = false;
    await chrome.tabs.get(tabId)
        .then((result) => {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
            res = false;
        } else {
            // console.log("all things ok");
            res = true;
        }})
        .catch((error) => {
            console.log(error);
            res = false;
        });
    return res;
}

function doBackward(lk, ifDelete) {
    var back;
    if (!lk || !(back = lk.loadBackard(ifDelete)) || back.windowId != lk.windowId) {
        return;
    }
    chrome.tabs.update(back.tabId, {active: true}, function(res) {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
            doBackward(lk, true);
        }
    });
}

function doForward(lk, ifDelete) {
    var forw;
    if (!lk || !(forw = lk.loadForward(ifDelete)) || forw.windowId != lk.windowId) {
        return;
    }
    chrome.tabs.update(forw.tabId, {active: true}, function(res) {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
            doForward(lk, true);
        }
    });
}

try{
    var map = new Map();
    chrome.storage.local.get("MAP", function(data) {
        if (chrome.runtime.lastError || !data) {
            map = new Map();
        } else {
            map = new Map();
            var ols = new Map(Object.entries(data.MAP));
            for (var [key, value] of ols) {
                var h = value.head, t = value.tail, c = value.cur;
                var lk = new LinkedList(parseInt(key));
                var cur;
                var pnode;
                while(h.next != null) {
                    h = h.next;
                    if (h.windowId != -1 && h.tabId != -1) {
                        pnode = new PNode(h.windowId, h.tabId);
                        if (h == c || (h.windowId == c.windowId && h.tabId == c.tabId)) {
                            console.log(pnode);
                            cur = pnode;
                        }
                        lk.add(pnode);
                    }
                }
                if (cur) {
                    lk.cur = cur;
                }
                map.set(parseInt(key), lk);
              }
        }
    });
    chrome.commands.onCommand.addListener(function (command) {
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
                doBackward(lk, false);
                chrome.storage.local.set({"MAP": Object.fromEntries(map)});
            });
        }
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
                doForward(lk, false);
                chrome.storage.local.set({"MAP": Object.fromEntries(map)});
            });
        }
    });
    chrome.tabs.onActivated.addListener(function(activeInfo) {

        var windowId = activeInfo.windowId;
        var tabId = activeInfo.tabId;
        var lk;
        
        if (map.has(windowId)) {
            lk = map.get(windowId);
            if (!lk || lk.windowId != windowId) {
                lk.clear();
                lk = new LinkedList(windowId);
                map.set(windowId, lk);
            }
        } else {
            lk = new LinkedList(windowId);
            map.set(windowId, lk);
        }
        if (lk.cur.windowId == windowId && lk.cur.tabId == tabId) {
            return;
        } else {
            var curNode = new PNode(windowId, tabId);
            lk.add(curNode);
            chrome.storage.local.set({"MAP": Object.fromEntries(map)});
        }
    });
    
} catch(e) {
    map.clear();
    chrome.storage.local.set({"MAP": null});
    console.error(e);
}