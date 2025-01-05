
const WarningPage = () => {

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Access Denied</h1>
            <p style={styles.message}>
                This application can only be accessed through the Telegram app.
                Please use the Telegram WebApp feature to access this page.
            </p>
            <p style={styles.hint}>
                Open Telegram, navigate to the bot, and use the WebApp button to access the app.
            </p>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: '20px',
        textAlign: 'center' as const,
    },
    title: {
        fontSize: '32px',
        marginBottom: '16px',
    },
    message: {
        fontSize: '18px',
        marginBottom: '24px',
    },
    hint: {
        fontSize: '16px',
        color: '#856404',
    },
};

export default WarningPage;
