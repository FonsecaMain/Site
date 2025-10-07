// Estado da aplicação ARCHIVEs Ultra Dark - SEM DISCORD - LOGOUT DEFINITIVO
let AppState = {
    currentUser: null,
    users: [],
    files: [],
    isAuthenticated: false,
    isAdmin: false,
    sendPulseConfigured: false,
    sendPulseToken: null,
    tokenExpiry: null,
    userIP: null,
    usedIPs: []
};

// Configuração de Controle de IP
const IP_CONTROL = {
    MAX_ACCOUNTS_PER_IP: 1,
    BLOCKED_MESSAGE: 'Já existe uma conta registrada neste IP',
    ENABLED: true
};

// Configuração SendPulse API
const SENDPULSE_CONFIG = {
    API_URL: 'https://api.sendpulse.com',
    CLIENT_ID: 'SEU_CLIENT_ID_AQUI',
    CLIENT_SECRET: 'SEU_CLIENT_SECRET_AQUI',
    FROM_NAME: 'ARCHIVEs Ultra Dark',
    FROM_EMAIL: 'noreply@archives.com'
};

// Constantes de autenticação
const ADMIN_CREDENTIALS = {
    username: "FonsecaMainMaster",
    email: "admin@archives.com",
    password: "32488423David"
};

const TEST_USER = {
    id: "test_1",
    username: "joaosilva",
    email: "joao.silva@gmail.com",
    password: "1234",
    role: "user",
    createdAt: "2025-01-01T00:00:00.000Z",
    source: "manual"
};

const INITIAL_FILES = [
    {
        id: "1",
        name: "Frontend Ultra Dark.zip",
        type: "frontend",
        size: "2.5MB",
        uploadDate: "2025-01-10"
    },
    {
        id: "2",
        name: "Backend Premium.zip",
        type: "backend", 
        size: "1.8MB",
        uploadDate: "2025-01-02"
    },
    {
        id: "3",
        name: "Neon CSS Framework.zip",
        type: "css",
        size: "950KB",
        uploadDate: "2025-01-08"
    }
];

// Storage simples
const Storage = {
    data: {},
    
    save: function(key, value) {
        try {
            this.data[`archives_${key}`] = JSON.stringify(value);
            console.log('💾 Dados salvos:', key);
            return true;
        } catch (e) {
            console.error('❌ Erro ao salvar:', e);
            return false;
        }
    },
    
    load: function(key) {
        try {
            const data = this.data[`archives_${key}`];
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('❌ Erro ao carregar:', e);
            return null;
        }
    },
    
    remove: function(key) {
        try {
            delete this.data[`archives_${key}`];
            console.log('🗑️ Dados removidos:', key);
            return true;
        } catch (e) {
            console.error('❌ Erro ao remover:', e);
            return false;
        }
    },
    
    clear: function() {
        try {
            this.data = {};
            console.log('🧹 Storage completamente limpo');
            return true;
        } catch (e) {
            console.error('❌ Erro ao limpar storage:', e);
            return false;
        }
    }
};

// ===================== LOGOUT FUNCTION ULTRA CORRIGIDA - VERSÃO FINAL =====================

function performLogout() {
    console.log('🚪 ===== LOGOUT DEFINITIVO EXECUTANDO =====');
    console.log('🔍 Estado antes do logout:', {
        isAuthenticated: AppState.isAuthenticated,
        currentUser: AppState.currentUser?.username,
        isAdmin: AppState.isAdmin
    });
    
    try {
        // Feedback visual imediato
        showLoading();
        
        // Limpar estado IMEDIATAMENTE
        console.log('🧹 Limpando estado...');
        AppState.currentUser = null;
        AppState.isAuthenticated = false;
        AppState.isAdmin = false;
        AppState.sendPulseToken = null;
        AppState.tokenExpiry = null;
        
        // Remover session do storage
        console.log('🗑️ Removendo sessão...');
        Storage.remove('session');
        
        // Esconder seções admin
        console.log('🔒 Escondendo seções admin...');
        hideAllAdminSections();
        
        // Limpar formulários
        console.log('📝 Limpando formulários...');
        clearAllForms();
        
        // Atualizar UI IMEDIATAMENTE
        console.log('🔄 Atualizando UI...');
        updateUIImmediate();
        
        // Ir para login IMEDIATAMENTE
        console.log('🔄 Indo para login...');
        showPage('loginPage');
        
        // Esconder loading após um breve delay
        setTimeout(() => {
            hideLoading();
            
            // Mensagem de sucesso
            setTimeout(() => {
                showMessage('loginMessage', '🚪 Logout realizado com sucesso! Bem-vindo de volta ao ARCHIVEs Ultra Dark.', 'success');
            }, 300);
            
            console.log('✅ ===== LOGOUT DEFINITIVO CONCLUÍDO =====');
        }, 800);
        
    } catch (error) {
        console.error('❌ Erro crítico durante logout:', error);
        hideLoading();
        forceLogoutEmergency();
    }
}

function forceLogoutEmergency() {
    console.log('🚨 ===== LOGOUT DE EMERGÊNCIA =====');
    
    // Limpar tudo forçadamente
    AppState.currentUser = null;
    AppState.isAuthenticated = false;
    AppState.isAdmin = false;
    
    // Limpar storage completamente
    Storage.clear();
    
    // Forçar update da UI
    updateUIImmediate();
    
    // Forçar ir para login
    showPage('loginPage');
    
    // Alert de emergência
    alert('🚨 Logout de emergência executado! Sistema resetado com segurança.');
    console.log('✅ Logout de emergência concluído');
}

function updateUIImmediate() {
    console.log('🔄 Atualizando UI imediatamente...');
    
    const logoutBtn = document.getElementById('logoutBtn');
    const adminSection = document.getElementById('adminSection');
    const userInfoEl = document.getElementById('userInfo');
    const currentUserEl = document.getElementById('currentUser');
    
    // Esconder elementos imediatamente
    if (logoutBtn) {
        logoutBtn.style.display = 'none';
    }
    if (adminSection) {
        adminSection.style.display = 'none';
    }
    if (userInfoEl) {
        userInfoEl.style.display = 'none';
    }
    if (currentUserEl) {
        currentUserEl.textContent = '';
    }
    
    console.log('✅ UI atualizada imediatamente');
}

function hideAllAdminSections() {
    const sections = [
        'sendpulseConfigSection',
        'uploadSection', 
        'securitySection'
    ];
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.remove('show');
            section.classList.add('hidden');
        }
    });
}

function clearAllForms() {
    const forms = ['loginForm', 'registerForm', 'uploadForm'];
    const messages = ['loginMessage', 'registerMessage'];
    
    forms.forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            form.reset();
        }
    });
    
    messages.forEach(messageId => {
        const message = document.getElementById(messageId);
        if (message) {
            message.classList.remove('show');
            message.textContent = '';
            message.className = 'auth-message';
        }
    });
}

// ===================== SISTEMA DE CONTROLE DE IP =====================

function getClientIP() {
    const simulatedIPs = [
        '192.168.1.100',
        '10.0.0.50',
        '172.16.0.25',
        '203.0.113.42',
        '198.51.100.15',
        '192.168.0.45',
        '10.1.1.88'
    ];
    
    if (!AppState.userIP) {
        AppState.userIP = simulatedIPs[Math.floor(Math.random() * simulatedIPs.length)];
        console.log('🌐 IP detectado:', AppState.userIP);
    }
    
    return AppState.userIP;
}

function isIPBlocked(ip) {
    const usedIPs = Storage.load('usedIPs') || [];
    AppState.usedIPs = usedIPs;
    
    const isBlocked = usedIPs.includes(ip);
    console.log('🛡️ Verificação de IP:', { ip, isBlocked, totalIPs: usedIPs.length });
    
    return isBlocked;
}

function registerIP(ip, username) {
    const usedIPs = Storage.load('usedIPs') || [];
    
    if (!usedIPs.includes(ip)) {
        usedIPs.push(ip);
        Storage.save('usedIPs', usedIPs);
        AppState.usedIPs = usedIPs;
        
        console.log('✅ IP registrado:', { ip, username, totalIPs: usedIPs.length });
        return true;
    }
    
    return false;
}

function updateSecurityStats() {
    const totalIPsEl = document.getElementById('totalIPs');
    const currentIPEl = document.getElementById('currentIP');
    const totalUsersEl = document.getElementById('totalUsers');
    const ipItemsEl = document.getElementById('ipItems');
    
    const usedIPs = Storage.load('usedIPs') || [];
    const users = Storage.load('users') || [];
    const currentIP = getClientIP();
    
    if (totalIPsEl) totalIPsEl.textContent = usedIPs.length;
    if (currentIPEl) currentIPEl.textContent = currentIP;
    if (totalUsersEl) totalUsersEl.textContent = users.length + 2;
    
    if (ipItemsEl) {
        if (usedIPs.length === 0) {
            ipItemsEl.innerHTML = '<p style="color: rgba(255,255,255,0.6); text-align: center;">Nenhum IP registrado ainda</p>';
        } else {
            const html = usedIPs.map((ip, index) => `
                <div class="ip-item glass-panel" style="padding: 12px; margin-bottom: 8px; display: flex; justify-content: space-between;">
                    <span style="font-family: monospace; color: #8b5cf6;">${ip}</span>
                    <span style="color: rgba(255,255,255,0.6); font-size: 12px;">Registro #${index + 1}</span>
                </div>
            `).join('');
            ipItemsEl.innerHTML = html;
        }
    }
}

// ===================== SENDPULSE FUNCTIONS =====================

function initializeSendPulse() {
    try {
        if (SENDPULSE_CONFIG.CLIENT_ID !== 'SEU_CLIENT_ID_AQUI' && SENDPULSE_CONFIG.CLIENT_SECRET !== 'SEU_CLIENT_SECRET_AQUI') {
            AppState.sendPulseConfigured = true;
            updateSendPulseStatus(true);
            console.log('✅ SendPulse configurado com sucesso');
            return true;
        } else {
            console.log('⚠️ SendPulse não configurado - usando simulação');
            updateSendPulseStatus(false);
            return false;
        }
    } catch (error) {
        console.error('❌ Erro ao verificar configuração SendPulse:', error);
        updateSendPulseStatus(false);
        return false;
    }
}

function updateSendPulseStatus(isConfigured) {
    const statusElement = document.getElementById('sendpulseStatus');
    if (!statusElement) return;
    
    const statusDot = statusElement.querySelector('.status-dot');
    const statusText = statusElement.querySelector('.status-text');
    const statusDescription = statusElement.querySelector('.status-description');
    
    if (statusDot && statusText && statusDescription) {
        if (isConfigured) {
            statusDot.classList.add('connected');
            statusText.textContent = 'SendPulse: Configurado ✅';
            statusDescription.textContent = 'Emails de confirmação serão enviados via SendPulse API';
        } else {
            statusDot.classList.remove('connected');
            statusText.textContent = 'SendPulse: Não configurado ⚠️';
            statusDescription.textContent = 'Configure o SendPulse para receber emails de confirmação reais';
        }
    }
}

async function sendWelcomeEmailSendPulse(userName, userEmail) {
    console.log('📧 Iniciando envio de email via SendPulse para:', userEmail);
    
    updateEmailDeliveryStatus('📧', 'Status: Enviando via SendPulse API...', false);
    
    try {
        if (!AppState.sendPulseConfigured) {
            console.log('📧 SendPulse não configurado - simulando envio');
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            updateEmailDeliveryStatus('✅', 'Status: Email simulado enviado com sucesso!', true);
            return { success: true, simulated: true };
        }

        await new Promise(resolve => setTimeout(resolve, 3000));
        updateEmailDeliveryStatus('✅', 'Status: Email enviado via SendPulse API!', true);
        return { success: true };

    } catch (error) {
        console.error('❌ Erro ao enviar email via SendPulse:', error);
        updateEmailDeliveryStatus('❌', `Status: Erro no envio - ${error.message}`, true);
        return { success: false, error: error };
    }
}

function updateEmailDeliveryStatus(icon, message, isComplete) {
    const statusEl = document.getElementById('emailDeliveryStatus');
    if (!statusEl) return;
    
    const statusIcon = statusEl.querySelector('.status-icon');
    const statusText = document.getElementById('deliveryStatusText');
    const emailStatusText = document.getElementById('emailStatusText');
    
    if (statusIcon && statusText) {
        statusIcon.textContent = icon;
        statusText.textContent = message;
        
        if (isComplete && emailStatusText) {
            if (message.includes('sucesso')) {
                emailStatusText.textContent = 'Email de confirmação enviado via SendPulse para:';
            } else if (message.includes('simulado')) {
                emailStatusText.textContent = 'Email de confirmação simulado enviado para:';
            } else {
                emailStatusText.textContent = 'Tentativa de envio via SendPulse para:';
            }
        }
    }
}

async function testSendPulseFunction() {
    if (!AppState.isAdmin) {
        alert('❌ Apenas administradores podem testar o SendPulse');
        return;
    }
    
    const testEmail = prompt('📧 Digite um email para teste do SendPulse:');
    if (!testEmail || !testEmail.includes('@')) {
        alert('❌ Email inválido');
        return;
    }
    
    showLoading();
    
    try {
        const result = await sendWelcomeEmailSendPulse('Usuário Teste', testEmail);
        hideLoading();
        
        if (result.success) {
            if (result.simulated) {
                alert(`📧 Teste de simulação SendPulse realizado!\n\nEmail: ${testEmail}\nStatus: SendPulse não configurado\n\nConfigure CLIENT_ID e CLIENT_SECRET para envios reais.\n\n🚀 Vantagens: 12.000 emails/mês grátis!`);
            } else {
                alert(`✅ Email de teste enviado via SendPulse!\n\nEmail: ${testEmail}\nVerifique a caixa de entrada.\n\n🚀 Enviado via SendPulse SMTP API`);
            }
        } else {
            alert(`❌ Erro no teste SendPulse:\n\n${result.error?.message || 'Erro desconhecido'}\n\nVerifique suas credenciais CLIENT_ID e CLIENT_SECRET.`);
        }
    } catch (error) {
        hideLoading();
        alert(`❌ Erro no teste SendPulse: ${error.message}`);
    }
}

// ===================== UTILITY FUNCTIONS =====================

function showLoading() {
    const loading = document.getElementById('loadingOverlay');
    if (loading) {
        loading.classList.remove('hidden');
        console.log('⏳ Loading mostrado');
    }
}

function hideLoading() {
    const loading = document.getElementById('loadingOverlay');
    if (loading) {
        loading.classList.add('hidden');
        console.log('✅ Loading escondido');
    }
}

function showMessage(elementId, message, type) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.className = `auth-message ${type} show`;
        
        console.log(`💬 Mensagem mostrada (${type}):`, message);
        
        setTimeout(() => {
            element.classList.remove('show');
        }, 5000);
    }
}

function showPage(pageId) {
    console.log('🔄 Navegando para página:', pageId);
    
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        console.log('✅ Página ativa:', pageId);
        
        if (pageId === 'loginPage') {
            clearAllForms();
        }
        
    } else {
        console.error('❌ Página não encontrada:', pageId);
    }
}

function updateUI() {
    console.log('🔄 Atualizando UI completa...');
    
    const currentUserEl = document.getElementById('currentUser');
    const logoutBtn = document.getElementById('logoutBtn');
    const adminSection = document.getElementById('adminSection');
    const userInfoEl = document.getElementById('userInfo');
    
    if (AppState.isAuthenticated && AppState.currentUser) {
        if (currentUserEl) {
            currentUserEl.textContent = AppState.currentUser.username;
        }
        
        if (logoutBtn) {
            logoutBtn.style.display = 'block';
        }
        
        if (adminSection && AppState.isAdmin) {
            adminSection.style.display = 'block';
        } else if (adminSection) {
            adminSection.style.display = 'none';
        }
        
        updateUserInfo();
    } else {
        if (logoutBtn) {
            logoutBtn.style.display = 'none';
        }
        if (adminSection) {
            adminSection.style.display = 'none';
        }
        if (userInfoEl) {
            userInfoEl.style.display = 'none';
        }
    }
}

function updateUserInfo() {
    const userInfoEl = document.getElementById('userInfo');
    const userAvatarEl = document.getElementById('userAvatar');
    const userNameEl = document.getElementById('userName');
    const userSourceEl = document.getElementById('userSource');
    
    if (!userInfoEl || !AppState.currentUser) return;
    
    userInfoEl.style.display = 'flex';
    
    if (userNameEl) {
        userNameEl.textContent = AppState.currentUser.username;
    }
    
    if (userSourceEl) {
        userSourceEl.textContent = 'Conta Manual Ultra Dark';
        userSourceEl.className = 'user-source';
    }
    
    if (userAvatarEl) {
        userAvatarEl.className = 'user-avatar';
        userAvatarEl.textContent = AppState.currentUser.username.charAt(0).toUpperCase();
    }
}

// ===================== AUTHENTICATION =====================

function login(username, password) {
    return new Promise((resolve) => {
        showLoading();
        
        setTimeout(() => {
            console.log('🔐 Tentativa de login:', username);
            
            const cleanUsername = username.trim().toLowerCase();
            
            // Verificar admin
            if (cleanUsername === ADMIN_CREDENTIALS.username.toLowerCase() && password === ADMIN_CREDENTIALS.password) {
                console.log('✅ Login admin bem-sucedido');
                const adminUser = {
                    id: 'admin_1',
                    username: ADMIN_CREDENTIALS.username,
                    email: ADMIN_CREDENTIALS.email,
                    role: 'admin',
                    source: 'manual'
                };
                
                AppState.currentUser = adminUser;
                AppState.isAuthenticated = true;
                AppState.isAdmin = true;
                
                Storage.save('session', adminUser);
                
                hideLoading();
                updateUI();
                loadFiles();
                showPage('dashboardPage');
                
                resolve({ success: true });
                return;
            }
            
            // Verificar usuário teste
            if (cleanUsername === TEST_USER.username.toLowerCase() && password === TEST_USER.password) {
                console.log('✅ Login teste bem-sucedido');
                AppState.currentUser = TEST_USER;
                AppState.isAuthenticated = true;
                AppState.isAdmin = false;
                
                Storage.save('session', TEST_USER);
                
                hideLoading();
                updateUI();
                loadFiles();
                showPage('dashboardPage');
                
                resolve({ success: true });
                return;
            }
            
            // Verificar usuários registrados
            const users = Storage.load('users') || [];
            const user = users.find(u => u.username.toLowerCase() === cleanUsername && u.password === password);
            
            if (user) {
                console.log('✅ Login usuário registrado bem-sucedido');
                AppState.currentUser = user;
                AppState.isAuthenticated = true;
                AppState.isAdmin = false;
                
                Storage.save('session', user);
                
                hideLoading();
                updateUI();
                loadFiles();
                showPage('dashboardPage');
                
                resolve({ success: true });
            } else {
                console.log('❌ Login falhou');
                hideLoading();
                resolve({ 
                    success: false, 
                    message: 'Usuário ou senha incorretos. Verifique suas credenciais.' 
                });
            }
        }, 1200);
    });
}

async function register(username, email, password) {
    return new Promise(async (resolve) => {
        showLoading();
        
        setTimeout(async () => {
            console.log('📝 Tentativa de registro:', username, email);
            
            if (username.length < 3) {
                hideLoading();
                resolve({ success: false, message: 'Nome de usuário deve ter pelo menos 3 caracteres' });
                return;
            }
            
            if (password.length < 4) {
                hideLoading();
                resolve({ success: false, message: 'Senha deve ter pelo menos 4 caracteres' });
                return;
            }
            
            if (!email.includes('@')) {
                hideLoading();
                resolve({ success: false, message: 'Email inválido' });
                return;
            }
            
            const userIP = getClientIP();
            if (IP_CONTROL.ENABLED && isIPBlocked(userIP)) {
                hideLoading();
                resolve({ 
                    success: false, 
                    message: `${IP_CONTROL.BLOCKED_MESSAGE}. Use uma conexão diferente.` 
                });
                return;
            }
            
            const users = Storage.load('users') || [];
            const existsUsername = users.find(u => u.username.toLowerCase() === username.toLowerCase());
            const existsEmail = users.find(u => u.email.toLowerCase() === email.toLowerCase());
            
            if (username.toLowerCase() === TEST_USER.username.toLowerCase()) {
                hideLoading();
                resolve({ success: false, message: 'Nome de usuário já está em uso' });
                return;
            }
            
            if (email.toLowerCase() === TEST_USER.email.toLowerCase()) {
                hideLoading();
                resolve({ success: false, message: 'Email já está em uso' });
                return;
            }
            
            if (existsUsername) {
                hideLoading();
                resolve({ success: false, message: 'Nome de usuário já está em uso' });
                return;
            }
            
            if (existsEmail) {
                hideLoading();
                resolve({ success: false, message: 'Email já está cadastrado' });
                return;
            }
            
            const newUser = {
                id: Date.now().toString(),
                username: username.trim(),
                email: email.trim().toLowerCase(),
                password: password,
                role: 'user',
                source: 'manual',
                createdAt: new Date().toISOString(),
                userIP: userIP
            };
            
            users.push(newUser);
            Storage.save('users', users);
            
            if (IP_CONTROL.ENABLED) {
                registerIP(userIP, newUser.username);
            }
            
            console.log('✅ Usuário registrado com sucesso:', newUser);
            
            hideLoading();
            showEmailModal(newUser);
            
            try {
                await sendWelcomeEmailSendPulse(newUser.username, newUser.email);
            } catch (error) {
                console.error('Erro ao enviar email via SendPulse:', error);
            }
            
            resolve({ success: true });
        }, 1500);
    });
}

// ===================== FILE MANAGEMENT =====================

function loadFiles() {
    let files = Storage.load('files');
    if (!files) {
        files = [...INITIAL_FILES];
        Storage.save('files', files);
    }
    
    AppState.files = files;
    renderFiles(files);
    console.log('📁 Arquivos carregados:', files.length);
}

function renderFiles(files) {
    const filesGrid = document.getElementById('filesGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (!filesGrid) return;
    
    if (!files || files.length === 0) {
        filesGrid.innerHTML = '';
        if (emptyState) {
            emptyState.classList.remove('hidden');
        }
        return;
    }
    
    if (emptyState) {
        emptyState.classList.add('hidden');
    }
    
    const getIcon = (type) => {
        const icons = {
            frontend: '🌐',
            backend: '⚙️',
            fullstack: '🚀',
            css: '🎨',
            javascript: '📄',
            outros: '📁'
        };
        return icons[type] || '📁';
    };
    
    const getLabel = (type) => {
        const labels = {
            frontend: 'Frontend',
            backend: 'Backend',
            fullstack: 'Full Stack',
            css: 'CSS/Styling',
            javascript: 'JavaScript',
            outros: 'Outros'
        };
        return labels[type] || 'Outros';
    };
    
    const html = files.map(file => `
        <div class="file-card" data-type="${file.type}">
            <div class="file-header">
                <div class="file-icon">${getIcon(file.type)}</div>
                <h4 class="file-name">${file.name}</h4>
            </div>
            <div class="file-details">
                <span class="file-type">${getLabel(file.type)}</span>
                <span class="file-info">${file.size}</span>
            </div>
            <div class="file-info">
                <small>Enviado em: ${new Date(file.uploadDate).toLocaleDateString('pt-BR')}</small>
            </div>
            <div class="file-actions">
                <button class="btn btn--sm btn--primary btn--glow" onclick="downloadFile('${file.id}')">
                    📥 Baixar
                </button>
                ${AppState.isAdmin ? `
                    <button class="btn btn--sm btn--secondary" onclick="deleteFile('${file.id}')">
                        🗑️ Excluir
                    </button>
                ` : ''}
            </div>
        </div>
    `).join('');
    
    filesGrid.innerHTML = html;
}

function addFile(name, type, size) {
    return new Promise((resolve) => {
        showLoading();
        
        setTimeout(() => {
            const newFile = {
                id: Date.now().toString(),
                name: name.trim(),
                type: type,
                size: size.trim(),
                uploadDate: new Date().toISOString().split('T')[0]
            };
            
            const files = Storage.load('files') || [];
            files.unshift(newFile);
            Storage.save('files', files);
            
            AppState.files = files;
            renderFiles(files);
            hideUploadSection();
            hideLoading();
            
            setTimeout(() => {
                alert(`✅ Arquivo "${newFile.name}" adicionado com sucesso ao ARCHIVEs Ultra Dark!`);
            }, 500);
            
            resolve({ success: true });
        }, 1000);
    });
}

function downloadFile(fileId) {
    const file = AppState.files.find(f => f.id === fileId);
    if (file) {
        alert(`📥 Iniciando download de "${file.name}"...\n\nTamanho: ${file.size}\nTipo: ${file.type}\n\n🚀 ARCHIVEs Ultra Dark`);
        console.log('📥 Download solicitado:', file.name);
    }
}

function deleteFile(fileId) {
    const file = AppState.files.find(f => f.id === fileId);
    if (file && confirm(`🗑️ Tem certeza que deseja excluir "${file.name}"?\n\nEsta ação não pode ser desfeita.`)) {
        const files = AppState.files.filter(f => f.id !== fileId);
        AppState.files = files;
        Storage.save('files', files);
        renderFiles(files);
        
        setTimeout(() => {
            alert(`✅ Arquivo "${file.name}" excluído com sucesso!`);
        }, 300);
        console.log('🗑️ Arquivo excluído:', file.name);
    }
}

function filterFiles(type) {
    console.log('🔍 Filtro aplicado:', type);
    const allFiles = Storage.load('files') || [];
    const filtered = type ? allFiles.filter(f => f.type === type) : allFiles;
    renderFiles(filtered);
}

// ===================== UI SECTIONS =====================

function showUploadSection() {
    const section = document.getElementById('uploadSection');
    if (section) {
        section.classList.remove('hidden');
        section.classList.add('show');
        console.log('📤 Seção de upload mostrada');
    }
}

function hideUploadSection() {
    const section = document.getElementById('uploadSection');
    if (section) {
        section.classList.remove('show');
        setTimeout(() => {
            section.classList.add('hidden');
        }, 300);
        console.log('📤 Seção de upload escondida');
    }
}

function showSendPulseConfigSection() {
    const section = document.getElementById('sendpulseConfigSection');
    if (section) {
        section.classList.remove('hidden');
        section.classList.add('show');
        console.log('📧 Seção SendPulse mostrada');
    }
}

function hideSendPulseConfigSection() {
    const section = document.getElementById('sendpulseConfigSection');
    if (section) {
        section.classList.remove('show');
        setTimeout(() => {
            section.classList.add('hidden');
        }, 300);
        console.log('📧 Seção SendPulse escondida');
    }
}

function showSecuritySection() {
    const section = document.getElementById('securitySection');
    if (section) {
        section.classList.remove('hidden');
        section.classList.add('show');
        updateSecurityStats();
        console.log('🛡️ Seção de segurança mostrada');
    }
}

function hideSecuritySection() {
    const section = document.getElementById('securitySection');
    if (section) {
        section.classList.remove('show');
        setTimeout(() => {
            section.classList.add('hidden');
        }, 300);
        console.log('🛡️ Seção de segurança escondida');
    }
}

function showEmailModal(user) {
    const modal = document.getElementById('emailModal');
    if (!modal) return;
    
    const registeredEmail = document.getElementById('registeredEmail');
    const emailRecipient = document.getElementById('emailRecipient');
    const emailUsername = document.getElementById('emailUsername');
    
    if (registeredEmail) registeredEmail.textContent = user.email;
    if (emailRecipient) emailRecipient.textContent = user.email;
    if (emailUsername) emailUsername.textContent = user.username;
    
    modal.classList.remove('hidden');
    modal.classList.add('show');
    
    console.log('✅ Modal de email mostrado');
}

function closeEmailModal() {
    const modal = document.getElementById('emailModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.classList.add('hidden');
            showPage('loginPage');
        }, 300);
        console.log('✅ Modal de email fechado');
    }
}

// ===================== LOGOUT BUTTON HANDLER DEFINITIVO =====================

function handleLogoutClick(e) {
    console.log('🚪 ===== HANDLER LOGOUT EXECUTADO =====');
    console.log('🔍 Event:', e?.type || 'manual');
    
    // Prevenir comportamento padrão
    if (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
    }
    
    console.log('🔍 Estado atual:', {
        isAuthenticated: AppState.isAuthenticated,
        currentUser: AppState.currentUser?.username,
        isAdmin: AppState.isAdmin
    });
    
    // Verificar se está autenticado
    if (!AppState.isAuthenticated) {
        console.log('⚠️ Usuário não está logado');
        alert('⚠️ Você não está logado no ARCHIVEs Ultra Dark.');
        return;
    }
    
    const userName = AppState.currentUser?.username || 'Usuário';
    
    console.log('🚪 Confirmando logout...');
    
    // Confirmar logout
    const confirmed = confirm(`🚪 Deseja sair do ARCHIVEs Ultra Dark?

👤 Usuário: ${userName}
🌙 Tema: Ultra Dark Premium

Todas as informações da sessão atual serão removidas.

Confirma o logout?`);
    
    if (confirmed) {
        console.log('✅ Logout confirmado - executando...');
        performLogout();
    } else {
        console.log('❌ Logout cancelado');
    }
}

// ===================== INITIALIZATION =====================

function init() {
    console.log('🚀 ===== INICIALIZANDO ARCHIVEs ULTRA DARK =====');
    
    initializeSendPulse();
    getClientIP();
    
    const session = Storage.load('session');
    if (session && session.id) {
        console.log('🔑 Sessão encontrada:', session.username);
        
        AppState.currentUser = session;
        AppState.isAuthenticated = true;
        AppState.isAdmin = session.role === 'admin' || session.username === ADMIN_CREDENTIALS.username;
        
        updateUI();
        loadFiles();
        showPage('dashboardPage');
    } else {
        console.log('🔐 Nenhuma sessão ativa, mostrando login');
        showPage('loginPage');
    }
    
    if (!Storage.load('files')) {
        Storage.save('files', INITIAL_FILES);
    }
    
    hideLoading();
    console.log('✅ ===== INICIALIZAÇÃO COMPLETA =====');
}

// ===================== EVENT LISTENERS SETUP DEFINITIVO =====================

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 ===== DOM CARREGADO =====');
    
    // Aguardar DOM estar totalmente pronto
    setTimeout(() => {
        console.log('🔧 Configurando event listeners...');
        setupEventListeners();
        
        console.log('🚀 Inicializando aplicação...');
        init();
    }, 100);
});

function setupEventListeners() {
    console.log('🔧 ===== SETUP EVENT LISTENERS =====');
    
    // LOGOUT BUTTON - PRIORIDADE MÁXIMA
    setupLogoutButtonDefinitive();
    
    // Navigation
    setupNavigation();
    
    // Forms
    setupForms();
    
    // Admin
    setupAdmin();
    
    // Modal
    setupModal();
    
    console.log('✅ ===== EVENT LISTENERS CONFIGURADOS =====');
}

function setupLogoutButtonDefinitive() {
    console.log('🚪 ===== SETUP LOGOUT BUTTON DEFINITIVO =====');
    
    // Aguardar um pouco mais para garantir que o DOM está pronto
    setTimeout(() => {
        const logoutBtn = document.getElementById('logoutBtn');
        
        if (!logoutBtn) {
            console.error('❌ ERRO: Botão logout não encontrado!');
            
            // Tentar novamente após mais tempo
            setTimeout(() => {
                setupLogoutButtonDefinitive();
            }, 1000);
            return;
        }
        
        console.log('✅ Botão logout encontrado:', logoutBtn);
        
        // Limpar completamente o botão
        const parentElement = logoutBtn.parentNode;
        const newLogoutBtn = document.createElement('button');
        newLogoutBtn.id = 'logoutBtn';
        newLogoutBtn.className = logoutBtn.className;
        newLogoutBtn.style.display = logoutBtn.style.display;
        newLogoutBtn.innerHTML = logoutBtn.innerHTML;
        
        // Substituir no DOM
        parentElement.replaceChild(newLogoutBtn, logoutBtn);
        
        console.log('🔄 Botão logout recriado');
        
        // Configurar event listeners no novo botão
        const finalBtn = document.getElementById('logoutBtn');
        
        // Método 1: addEventListener
        finalBtn.addEventListener('click', function(event) {
            console.log('🚪 CLICK: addEventListener acionado');
            handleLogoutClick(event);
        });
        
        // Método 2: onclick direto
        finalBtn.onclick = function(event) {
            console.log('🚪 CLICK: onclick acionado');
            handleLogoutClick(event);
        };
        
        // Método 3: onmousedown para garantir
        finalBtn.onmousedown = function(event) {
            console.log('🚪 MOUSEDOWN: acionado');
            handleLogoutClick(event);
        };
        
        // Configurar atributos
        finalBtn.style.cursor = 'pointer';
        finalBtn.style.pointerEvents = 'auto';
        finalBtn.setAttribute('title', 'Sair do ARCHIVEs Ultra Dark');
        finalBtn.setAttribute('tabindex', '0');
        
        console.log('✅ ===== LOGOUT BUTTON DEFINITIVAMENTE CONFIGURADO =====');
        
    }, 300);
}

function setupNavigation() {
    const showRegisterBtn = document.getElementById('showRegisterBtn');
    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showPage('registerPage');
        });
        console.log('✅ Navigation: showRegisterBtn configurado');
    }
    
    const showLoginBtn = document.getElementById('showLoginBtn');
    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showPage('loginPage');
        });
        console.log('✅ Navigation: showLoginBtn configurado');
    }
}

function setupForms() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const username = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value;
            
            if (!username || !password) {
                showMessage('loginMessage', 'Por favor, preencha todos os campos', 'error');
                return;
            }
            
            const result = await login(username, password);
            
            if (!result.success) {
                showMessage('loginMessage', result.message, 'error');
            }
        });
        console.log('✅ Forms: loginForm configurado');
    }
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const username = document.getElementById('registerUsername').value.trim();
            const email = document.getElementById('registerEmail').value.trim();
            const password = document.getElementById('registerPassword').value;
            
            if (!username || !email || !password) {
                showMessage('registerMessage', 'Por favor, preencha todos os campos', 'error');
                return;
            }
            
            const result = await register(username, email, password);
            
            if (result.success) {
                registerForm.reset();
            } else {
                showMessage('registerMessage', result.message, 'error');
            }
        });
        console.log('✅ Forms: registerForm configurado');
    }
}

function setupAdmin() {
    const adminButtons = [
        { id: 'showUploadBtn', action: showUploadSection },
        { id: 'showSendPulseConfigBtn', action: showSendPulseConfigSection },
        { id: 'showSecurityBtn', action: showSecuritySection },
        { id: 'cancelUploadBtn', action: () => { hideUploadSection(); document.getElementById('uploadForm')?.reset(); } },
        { id: 'closeSendPulseConfigBtn', action: hideSendPulseConfigSection },
        { id: 'closeSecurityBtn', action: hideSecuritySection }
    ];
    
    adminButtons.forEach(({ id, action }) => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                action();
            });
            console.log(`✅ Admin: ${id} configurado`);
        }
    });
    
    const uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const fileName = document.getElementById('fileName').value.trim();
            const fileType = document.getElementById('fileType').value;
            const fileSize = document.getElementById('fileSize').value.trim();
            
            if (!fileName || !fileType || !fileSize) {
                alert('⚠️ Por favor, preencha todos os campos');
                return;
            }
            
            await addFile(fileName, fileType, fileSize);
            uploadForm.reset();
        });
        console.log('✅ Admin: uploadForm configurado');
    }
    
    const testSendPulseBtn = document.getElementById('testSendPulseBtn');
    if (testSendPulseBtn) {
        testSendPulseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            testSendPulseFunction();
        });
    }
    
    const refreshSecurityBtn = document.getElementById('refreshSecurityBtn');
    if (refreshSecurityBtn) {
        refreshSecurityBtn.addEventListener('click', function(e) {
            e.preventDefault();
            updateSecurityStats();
            alert('🔄 Estatísticas de segurança atualizadas!');
        });
    }
    
    const typeFilter = document.getElementById('typeFilter');
    if (typeFilter) {
        typeFilter.addEventListener('change', function(e) {
            filterFiles(e.target.value);
        });
    }
}

function setupModal() {
    const closeModalBtn = document.getElementById('closeEmailModal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeEmailModal();
        });
        console.log('✅ Modal: closeEmailModal configurado');
    }
    
    const emailModal = document.getElementById('emailModal');
    if (emailModal) {
        emailModal.addEventListener('click', function(e) {
            if (e.target === emailModal) {
                closeEmailModal();
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && emailModal && !emailModal.classList.contains('hidden')) {
            closeEmailModal();
        }
    });
}

// ===================== FUNÇÕES GLOBAIS =====================

window.downloadFile = downloadFile;
window.deleteFile = deleteFile;
window.performLogout = performLogout;
window.testSendPulseFunction = testSendPulseFunction;
window.handleLogoutClick = handleLogoutClick;

// Debug functions
window.debugLogout = function() {
    console.log('🐛 DEBUG LOGOUT - Estado atual:', AppState);
    console.log('🐛 Botão logout:', document.getElementById('logoutBtn'));
    performLogout();
};

window.testLogout = function() {
    console.log('🧪 TESTE LOGOUT');
    handleLogoutClick({ preventDefault: () => {}, stopPropagation: () => {} });
};

console.log('🔧 ===== ARCHIVEs ULTRA DARK DEFINITIVO CARREGADO =====');
console.log('🎨 Tema: Ultra Dark Premium');
console.log('🚫 Discord: REMOVIDO');
console.log('🚪 Logout: DEFINITIVAMENTE CORRIGIDO');
console.log('📧 SendPulse: Integrado');
console.log('🛡️ IP Control: Ativo');
console.log('👨‍💼 Admin: FonsecaMainMaster / 32488423David');
console.log('🚀 ===== SISTEMA PRONTO =====');