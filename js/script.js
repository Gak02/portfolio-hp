document.addEventListener('DOMContentLoaded', function() {
    // モバイルメニューの開閉
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const header = document.querySelector('header');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            header.classList.toggle('nav-open');
        });
    }

    // ページ内リンクのスムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // #だけの場合はトップへスクロール
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // ヘッダーの高さを考慮したスクロール位置の計算
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // モバイルメニューが開いていたら閉じる
                if (header.classList.contains('nav-open')) {
                    header.classList.remove('nav-open');
                }
            }
        });
    });

    // お問い合わせフォームのバリデーション
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 簡易的なバリデーション
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // メールアドレスのバリデーション
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value.trim())) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (isValid) {
                // 実際の送信処理はここに記述（今回はデモのため省略）
                alert('お問い合わせありがとうございます。メッセージが送信されました。');
                contactForm.reset();
            } else {
                alert('必須項目をすべて入力してください。');
            }
        });
        
        // フォーカスが外れたときにもバリデーション
        contactForm.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('error');
                } else {
                    this.classList.remove('error');
                }
                
                // メールアドレスの追加バリデーション
                if (this.type === 'email' && this.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(this.value.trim())) {
                        this.classList.add('error');
                    }
                }
            });
        });
    }

    // 診療内容ページのタブナビゲーション強調表示
    const highlightCurrentSection = () => {
        const sections = document.querySelectorAll('.service-detail');
        const navItems = document.querySelectorAll('.service-nav-item');
        
        if (sections.length && navItems.length) {
            const scrollPosition = window.scrollY;
            const headerHeight = document.querySelector('header').offsetHeight;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - headerHeight - 100;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    const targetId = section.id;
                    
                    navItems.forEach(item => {
                        if (item.getAttribute('href') === `#${targetId}`) {
                            item.classList.add('active');
                        } else {
                            item.classList.remove('active');
                        }
                    });
                }
            });
        }
    };
    
    // スクロール時にセクションハイライトを更新
    window.addEventListener('scroll', highlightCurrentSection);
    
    // ページ読み込み時にも実行
    highlightCurrentSection();

    // フォームのエラースタイル追加
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            input.error, textarea.error, select.error {
                border-color: #ef4565 !important;
                background-color: rgba(239, 69, 101, 0.05);
            }
        </style>
    `);
});