var KothaTypeContentScript = (function (exports) {
    'use strict';

    // Simplified core transliteration logic — partial Avro-like
    const rules = [
        { pattern: /ami/g, replace: "আমি" },
        { pattern: /bangla(y)?/g, replace: "বাংলা$1" },
        { pattern: /gan/g, replace: "গান" },
        { pattern: /gai/g, replace: "গাই" },
        { pattern: /tomar/g, replace: "তোমার" },
        { pattern: /nam/g, replace: "নাম" },
        { pattern: /likhbo/g, replace: "লিখবো" },
    ];
    function transliterate(text) {
        let output = text;
        for (const rule of rules) {
            output = output.replace(rule.pattern, rule.replace);
        }
        return output;
    }

    function attachPhoneticInput(input) {
        input.addEventListener("input", () => {
            const text = input.value;
            const converted = transliterate(text);
            if (text !== converted)
                input.value = converted;
        });
    }
    window.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll("input[type=text], textarea").forEach(el => {
            attachPhoneticInput(el);
        });
    });

    exports.attachPhoneticInput = attachPhoneticInput;

    return exports;

})({});
