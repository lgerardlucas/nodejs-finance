async function pegarId() {
    return new Promise((resolve, rejecct) => {
        setTimeout(() => {
            resolve(12)
        }, 2000);
    });
}

async function enviarEmail(to, msg) {
    return new Promise ((resolve, reject) => {
        try {
            resolve(`${msg} ==> ${to}`);
        } catch (err) {
            reject('Erro ao enviar o email.')
        }
    })
}

async function principal() {
    try {
        const id = await pegarId();
        const msg = await enviarEmail('marcos@gmail.com', 'Espera do dinheiro.');
        console.log(id)
        console.log(msg)
    } catch (err) {
        console.log('Error: ' + err)
    }
}

principal();

// async function enviarEmail(msg, to){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             var deuErro = false;
//             if (!deuErro){
//                 resolve(`${msg} - ${to}`)
//             } else {
//                 reject('Erro ao enviar o email.')
//             }
//         },2000)
//     });
    
// }

// async function main() {
//     try {
//         console.log('inicio');
//         const id = await pegarId();

//         const message = await enviarEmail('Veja para festa', 'marcos@gmail.com');
//         console.log(message)
//         console.log('fim')
//     } catch(err){
//         console.log(err)
//     }
// }

// main()