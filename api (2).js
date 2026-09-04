const http = require('http');
const https = require('https');

const API_KEY = '58e09051cdab4964bfc3b2300f0a01ab';

// Dados simulados realistas
const partidasSimuladas = [
    {
        home: 'Chelsea',
        away: 'Brighton',
        league: 'Premier League',
        date: '2025-01-11 19:30',
        prob_home: 53.2,
        prob_draw: 28.1,
        prob_away: 18.7,
        odds_home: 1.92,
        odds_draw: 3.15,
        odds_away: 4.30
    },
    {
        home: 'Real Madrid',
        away: 'Cádiz',
        league: 'La Liga',
        date: '2025-01-11 20:00',
        prob_home: 58.4,
        prob_draw: 26.3,
        prob_away: 15.3,
        odds_home: 1.75,
        odds_draw: 3.40,
        odds_away: 5.00
    },
    {
        home: 'Bayern Munich',
        away: 'Bayer Leverkusen',
        league: 'Bundesliga',
        date: '2025-01-11 20:30',
        prob_home: 54.1,
        prob_draw: 28.9,
        prob_away: 17.0,
        odds_home: 1.88,
        odds_draw: 3.25,
        odds_away: 4.50
    },
    {
        home: 'PSG',
        away: 'Lens',
        league: 'Ligue 1',
        date: '2025-01-11 21:00',
        prob_home: 62.1,
        prob_draw: 24.2,
        prob_away: 13.7,
        odds_home: 1.62,
        odds_draw: 3.80,
        odds_away: 6.50
    },
    {
        home: 'Flamengo',
        away: 'Vasco',
        league: 'Brasileirão',
        date: '2025-01-11 21:00',
        prob_home: 51.2,
        prob_draw: 30.1,
        prob_away: 18.7,
        odds_home: 1.95,
        odds_draw: 3.10,
        odds_away: 4.20
    },
    {
        home: 'Manchester City',
        away: 'Ipswich Town',
        league: 'Premier League',
        date: '2025-01-11 15:00',
        prob_home: 65.3,
        prob_draw: 22.1,
        prob_away: 12.6,
        odds_home: 1.55,
        odds_draw: 3.95,
        odds_away: 7.00
    },
    {
        home: 'Juventus',
        away: 'Napoli',
        league: 'Serie A',
        date: '2025-01-11 20:45',
        prob_home: 49.3,
        prob_draw: 31.2,
        prob_away: 19.5,
        odds_home: 2.00,
        odds_draw: 3.05,
        odds_away: 4.10
    },
    {
        home: 'Sporting CP',
        away: 'Benfica',
        league: 'Primeira Liga',
        date: '2025-01-11 20:00',
        prob_home: 52.1,
        prob_draw: 29.3,
        prob_away: 18.6,
        odds_home: 1.98,
        odds_draw: 3.12,
        odds_away: 4.15
    }
];

// Gerar alertas
function gerarAlertas() {
    return partidasSimuladas.slice(0, 6).map((p, i) => ({
        id: i + 1,
        partida: `${p.home} x ${p.away}`,
        mercado: `${p.home} Vence`,
        prob: p.prob_home.toFixed(1),
        odd: p.odds_home,
        edge: (3 + Math.random() * 5).toFixed(1)
    }));
}

// Servidor HTTP
const server = http.createServer((req, res) => {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    const url = req.url;

    if (url === '/api/partidas') {
        res.writeHead(200);
        res.end(JSON.stringify(partidasSimuladas));

    } else if (url === '/api/alertas') {
        res.writeHead(200);
        res.end(JSON.stringify(gerarAlertas()));

    } else if (url === '/' || url === '') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Sistema de Apostas - Backend</title>
                <style>
                    body { font-family: Arial; padding: 40px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
                    .container { max-width: 600px; margin: 0 auto; background: rgba(0,0,0,0.2); padding: 30px; border-radius: 10px; }
                    h1 { margin-top: 0; }
                    code { background: rgba(0,0,0,0.3); padding: 5px 10px; border-radius: 3px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>💰 Sistema de Apostas</h1>
                    <p>✅ Backend rodando na Vercel!</p>
                    <p>Endpoints:</p>
                    <ul>
                        <li><code>/api/partidas</code> - Lista de partidas</li>
                        <li><code>/api/alertas</code> - Alertas de valor</li>
                    </ul>
                </div>
            </body>
            </html>
        `);

    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Backend rodando na porta ${PORT}`);
});

module.exports = server;
