import footerStyles from "../styles/Footer.module.css"

const ProfileFooter = () => {
    return (
        <footer className={footerStyles.footer}>
            <div>
                <p>Created by <a href="https://github.com/iamxxx777" target="_blank" rel="noopener noreferrer">Dayo-Ajobiewe Hope</a></p>
                <p><a href="https://devchallenges.io/challenges" target="_blank" rel="noopener noreferrer">devChallenges.io</a></p>
            </div>
        </footer>
    )
}

export default ProfileFooter
