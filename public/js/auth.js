// Authentication utility functions
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
    }

    // Check if user is authenticated
    async checkAuth() {
        try {
            const response = await fetch('/auth/profile');
            if (response.ok) {
                const data = await response.json();
                this.currentUser = data.user;
                this.isAuthenticated = true;
                return true;
            } else {
                this.currentUser = null;
                this.isAuthenticated = false;
                return false;
            }
        } catch (error) {
            console.error('Auth check error:', error);
            this.currentUser = null;
            this.isAuthenticated = false;
            return false;
        }
    }

    // Require authentication - redirect if not logged in
    async requireAuth(redirectUrl = '/login.html') {
        const isAuth = await this.checkAuth();
        if (!isAuth) {
            // Show message and redirect
            this.showAuthRequiredMessage();
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 2000);
            return false;
        }
        return true;
    }

    // Show authentication required message
    showAuthRequiredMessage() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(5px);
        `;

        // Create message box
        const messageBox = document.createElement('div');
        messageBox.style.cssText = `
            background: white;
            padding: 40px;
            border-radius: 15px;
            text-align: center;
            max-width: 400px;
            margin: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease-out;
        `;

        messageBox.innerHTML = `
            <div style="font-size: 48px; margin-bottom: 20px;">🔒</div>
            <h2 style="color: #333; margin-bottom: 15px;">Authentication Required</h2>
            <p style="color: #666; margin-bottom: 20px;">คุณต้องเข้าสู่ระบบก่อนเพื่อเข้าถึงหน้านี้</p>
            <p style="color: #667eea; font-weight: 500;">กำลังเปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบ...</p>
            <div style="margin-top: 20px;">
                <a href="/login.html" style="
                    display: inline-block;
                    padding: 10px 20px;
                    background: #667eea;
                    color: white;
                    text-decoration: none;
                    border-radius: 8px;
                    margin: 0 10px;
                    font-weight: 500;
                ">เข้าสู่ระบบ</a>
                <a href="/register.html" style="
                    display: inline-block;
                    padding: 10px 20px;
                    background: #28a745;
                    color: white;
                    text-decoration: none;
                    border-radius: 8px;
                    margin: 0 10px;
                    font-weight: 500;
                ">สมัครสมาชิก</a>
            </div>
        `;

        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);

        overlay.appendChild(messageBox);
        document.body.appendChild(overlay);

        // Remove overlay when clicking outside or on buttons
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    }

    // Update navigation based on auth status
    async updateNavigation() {
        const isAuth = await this.checkAuth();
        const navMenu = document.getElementById('nav-menu');
        
        if (navMenu) {
            if (isAuth) {
                // User is logged in - show dashboard and logout
                navMenu.innerHTML = `
                    <a href="/" class="nav-link">Home</a>
                    <a href="/dashboard.html" class="nav-link">Dashboard</a>
                    <a href="#" class="nav-link" onclick="authManager.logout()">Logout</a>
                    <span class="nav-user">สวัสดี, ${this.currentUser.firstName}!</span>
                `;
            } else {
                // User is not logged in - show login and register
                navMenu.innerHTML = `
                    <a href="/" class="nav-link">Home</a>
                    <a href="/login.html" class="nav-link">Login</a>
                    <a href="/register.html" class="nav-link">Register</a>
                `;
            }
        }
    }

    // Logout function
    async logout() {
        try {
            const response = await fetch('/auth/logout', {
                method: 'POST'
            });

            if (response.ok) {
                this.currentUser = null;
                this.isAuthenticated = false;
                window.location.href = '/login.html';
            } else {
                alert('Error logging out. Please try again.');
            }
        } catch (error) {
            console.error('Logout error:', error);
            alert('Network error. Please try again.');
        }
    }

    // Get current user info
    getCurrentUser() {
        return this.currentUser;
    }

    // Check if user is authenticated (synchronous)
    isUserAuthenticated() {
        return this.isAuthenticated;
    }
}

// Create global auth manager instance
const authManager = new AuthManager();
