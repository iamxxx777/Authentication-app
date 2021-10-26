import Head from "next/head"

const Meta = ({ title, description }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        </Head>
    )
}

Meta.defaultProps = {
    title: "Authentication App",
    description: "An app that handles authentication using traditional username and password and also allows for oauth signins"
}

export default Meta
