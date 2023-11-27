
    $( document ).ready(function() {
        const kbText=  $('.kb-text').keyboard({
            autoAccept: true,
            alwaysOpen: false,
            openOn: 'focus',
            usePreview: false,
            layout: 'custom',
            //layout: 'qwerty',
            display: {
                bksp: '\u2190',
                accept: 'Kthehu',
                default: 'ABC',
                meta1: '123',
                meta2: '#+=',
            },
            customLayout: {
                default: [
                    'q w e r t y u i o p {bksp}',
                    'a s d f g h j k l {enter}',
                    '{s} z x c v b n m , . {s}',
                    '{meta1} {space} {cancel} {accept}',
                ],
                shift: [
                    'Q W E R T Y U I O P {bksp}',
                    'A S D F G H J K L {enter}',
                    '{s} Z X C V B N M / ? {s}',
                    '{meta1} {space} {meta1} {accept}',
                ],
                meta1: [
                    '1 2 3 4 5 6 7 8 9 0 {bksp}',
                    '- / : ; ( ) \u20ac & @ {enter}',
                    '{meta2} . , ? ! \' " {meta2}',
                    '{default} {space} {default} {accept}',
                ],
                meta2: [
                    '[ ] { } # % ^ * + = {bksp}',
                    '_ \\ | &lt; &gt; $ \u00a3 \u00a5 {enter}',
                    '{meta1} ~ . , ? ! \' " {meta1}',
                    '{default} {space} {default} {accept}',
                ],
            },
        })
        kbText.on('accepted', function () {
            console.log('sss')
            const inputElement = $(this).find('input[type="text"]'); // Assuming your input element is inside the keyboard container
            inputElement.trigger('keyup');
        });
        // keyboard pad
        $('.kb-pad').keyboard({
            restrictInput: true,
            preventPaste: true,
            autoAccept: true,
            alwaysOpen: false,
            openOn: 'click',
            usePreview: false,
            layout: 'custom',
            display: {
                b: '\u2190:Backspace',
            },
            customLayout: {
                default: ['1 2 3 {b}', '4 5 6 . {clear}', '7 8 9 0 {clear}', '{accept} {cancel}'],
            },
        });
    })