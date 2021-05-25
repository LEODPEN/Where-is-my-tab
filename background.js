/**
 * @author https://github.com/LEODPEN
 * date: 2021/05/26
 * @description new version using linked list.
 */

 class Node {
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
        this.head = new Node(-1, -1);
        this.tail = new Node(-1, -1);
        this.head.next = this.tail;
        this.tail.pre = this.head;
    }

    empty() {
        return this.head.next == this.tail;
    }
    
    clear() {
        this.head.next = this.tail;
        this.tail.pre = this.head;
        this.curSize = 0;
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

    moveBackard() {
        // TODO
        if (this.empty() || this.cur == this.head) {
            this.cur = this.head;
        }

    }

    moveForward() {
        // TODO
        if (this.empty() || this.cur == this.head) {
            this.cur = this.head;
        }
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
