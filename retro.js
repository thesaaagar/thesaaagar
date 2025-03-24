
        // Dialog functionality
        const openDialogBtn = document.getElementById('open-dialog');
        const dialogExample = document.getElementById('dialog-example');
        const dialogClose = document.querySelector('.dialog-close');
        
        openDialogBtn.addEventListener('click', () => {
            dialogExample.style.display = 'flex';
        });
        
        dialogClose.addEventListener('click', () => {
            dialogExample.style.display = 'none';
        });
        
        dialogExample.addEventListener('click', (e) => {
            if (e.target === dialogExample) {
                dialogExample.style.display = 'none';
            }
        });
        
        // File Upload functionality
        const dropArea = document.getElementById('drop-area');
        const fileInput = document.getElementById('file-upload-input');
        const filePreview = document.getElementById('file-preview');
        const fileName = document.getElementById('file-name');
        const fileSize = document.getElementById('file-size');
        const fileRemove = document.getElementById('file-remove');
        
        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        // Highlight drop area when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, unhighlight, false);
        });
        
        function highlight() {
            dropArea.style.backgroundColor = 'rgba(255, 230, 109, 0.4)';
            dropArea.style.borderColor = 'var(--primary)';
        }
        
        function unhighlight() {
            dropArea.style.backgroundColor = 'rgba(255, 230, 109, 0.2)';
            dropArea.style.borderColor = 'var(--text)';
        }
        
        // Handle dropped files
        dropArea.addEventListener('drop', handleDrop, false);
        
        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            handleFiles(files);
        }
        
        fileInput.addEventListener('change', function() {
            handleFiles(this.files);
        });
        
        function handleFiles(files) {
            if (files.length > 0) {
                const file = files[0]; // Just handle the first file for simplicity
                displayFileInfo(file);
            }
        }
        
        function displayFileInfo(file) {
            fileName.textContent = file.name;
            fileSize.textContent = formatFileSize(file.size);
            filePreview.classList.add('active');
        }
        
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }
        
        fileRemove.addEventListener('click', () => {
            fileInput.value = '';
            filePreview.classList.remove('active');
        });
        
        // FAQ Accordion functionality
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                faqItem.classList.toggle('active');
            });
        });
    
    
            // टूलटिप फंक्शनैलिटी
        document.querySelectorAll('.tooltip').forEach(tooltip => {
            tooltip.addEventListener('mouseenter', () => {
                tooltip.querySelector('.tooltip-text').style.display = 'block';
            });
            
            tooltip.addEventListener('mouseleave', () => {
                tooltip.querySelector('.tooltip-text').style.display = 'none';
            });
        });

        // प्रोग्रेस बार एनिमेशन
        const progressFill = document.querySelector('.progress-fill');
        let width = 0;
        setInterval(() => {
            width = width >= 100 ? 0 : width + 1;
            progressFill.style.width = `${width}%`;
        }, 50);

        // पहले से मौजूद JS कोड...
        // (यहाँ आपका मौजूदा डायलॉग/फाइल अपलोड कोड आएगा)
        
        
        