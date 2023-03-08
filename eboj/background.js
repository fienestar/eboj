handlers = new Map();

handlers.set("get-tier", async message => {
    const res = await fetch(`https://solved.ac/api/v3/problem/show?problemId=${encodeURIComponent(message.id)}`);
    return await res.json();
})

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    const handler = handlers.get(message.type);

    function error(e){
        console.error(e);
        sendResponse({
            success: false,
            error: e?.message ?? "unknown error"
        });
    }

    function success(data){
        sendResponse({
            success: true,
            data: data
        });
    }

    if(handler) {
        try{
            const res = handler(message);
            if(res?.constructor === Promise){
                res.then(success).catch(error);
                return true;
            }else{
                success(res);
            }
        }catch(e){
            error(e);
        }
    }else{
        error(new Error("Unknown message type"));
    }
});
