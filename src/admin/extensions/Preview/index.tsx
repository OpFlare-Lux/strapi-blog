import React from "react";
import { Button } from "@strapi/design-system";
import { PanelComponent, PanelComponentProps } from '@strapi/content-manager/strapi-admin';

const PreviewButton: PanelComponent = ({
       activeTab,
       collectionType,
       document: currentRecord,
       documentId,
       meta,
       model
   }: PanelComponentProps) => {
    const typeMapping = {
        'api::article.article': 'BLOG',
    };

    const locale = currentRecord?.locale || 'en';
    const slug = currentRecord?.slug || 'test';
    const status = currentRecord?.status || 'draft';

    if (!currentRecord) {
        return null;
    }

    if (model !== 'api::article.article') {
        return null;
    }

    window.Clipboard = (function(window, document, navigator) {
        var textArea,
            copy;

        function isOS() {
            return navigator.userAgent.match(/ipad|iphone/i);
        }

        function createTextArea(text) {
            textArea = document.createElement('textArea');
            textArea.value = text;
            document.body.appendChild(textArea);
        }

        function selectText() {
            var range,
                selection;

            if (isOS()) {
                range = document.createRange();
                range.selectNodeContents(textArea);
                selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                textArea.setSelectionRange(0, 999999);
            } else {
                textArea.select();
            }
        }

        function copyToClipboard() {
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }

        copy = function(text) {
            createTextArea(text);
            selectText();
            copyToClipboard();
        };

        return {
            copy: copy
        };
    })(window, document, navigator);

    const handleLink = () => {
        let link = `https://easybiz-blog.netlify.app/api/preview?secret=j8heapkqy4rdz6kudrvsc7ywpvfhrv022abyx5zgmuwpc1xv&type=${typeMapping[model]}&locale=${locale}&slug=${slug}`;
        Clipboard.copy(link);
        navigator.clipboard.writeText(link);
        alert('Link copied to your clipboard');
    };

    return {
        title: 'Actions',
        content: <Button
            variant="tertiary"
            fullWidth
            disabled={model !== 'api::article.article' || status !== 'draft'}
            onClick={handleLink}
        >
            Preview
        </Button>
    }
}

export default PreviewButton;
