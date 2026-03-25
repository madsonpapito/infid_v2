const fs = require('fs');
const path = require('path');

// Read environment variables
const envPath = path.resolve(__dirname, '../../.env');
let META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
let AD_ACCOUNT_ID = process.env.AD_ACCOUNT_ID;

if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const [key, ...values] = line.split('=');
        if (key && values.length > 0) {
            const value = values.join('=').trim().replace(/^["'](.*)["']$/, '$1');
            if (key.trim() === 'META_ACCESS_TOKEN') META_ACCESS_TOKEN = value;
            if (key.trim() === 'AD_ACCOUNT_ID') AD_ACCOUNT_ID = value;
        }
    });
}

if (!META_ACCESS_TOKEN || !AD_ACCOUNT_ID) {
    console.error('Error: META_ACCESS_TOKEN or AD_ACCOUNT_ID not found in .env');
    process.exit(1);
}

// Clean up AD_ACCOUNT_ID (remove 'act_' prefix if present in env, though API needs it eventually)
const accountId = AD_ACCOUNT_ID.replace('act_', '');

async function fetchFacebookData() {
    console.log(`Fetching data for account: act_${accountId}...`);

    try {
        // 1. Fetch Ad Insights (Last 90 Days)
        const insightsUrl = `https://graph.facebook.com/v19.0/act_${accountId}/insights?date_preset=last_90d&level=ad&fields=ad_name,impressions,clicks,spend,cpc,ctr,actions,cost_per_action_type&access_token=${META_ACCESS_TOKEN}`;

        console.log('Fetching insights...');
        const insightsResponse = await fetch(insightsUrl);
        const insightsData = await insightsResponse.json();

        if (insightsData.error) {
            console.error('Error fetching insights:', insightsData.error);
            return;
        }

        // 2. Fetch Ad Creatives (to get text/images)
        const creativesUrl = `https://graph.facebook.com/v19.0/act_${accountId}/ads?fields=name,creative{title,body,object_story_spec},status&limit=100&access_token=${META_ACCESS_TOKEN}`;

        console.log('Fetching creatives...');
        const creativesResponse = await fetch(creativesUrl);
        const creativesData = await creativesResponse.json();

        if (creativesData.error) {
            console.error('Error fetching creatives:', creativesData.error);
            return;
        }

        // 3. Process and Aggregate Data
        const adPerformance = new Map();

        // Process Insights
        (insightsData.data || []).forEach(item => {
            // Calculate conversions (assuming 'purchase' or custom conversion is key, 
            // but for generic 'actions', we'll sum relevant ones if available. 
            // Often 'actions' is a list. Let's just store the raw actions for analysis.)
            adPerformance.set(item.ad_id, {
                ...item,
                creative: null // To be filled
            });
        });

        // Match with Creatives
        const validCreatives = [];
        (creativesData.data || []).forEach(ad => {
            // Find performance data for this ad (using ad name matching or if we had IDs. The insights endpoint returns ad_id if requested, let's fix that)
            // Wait, insights endpoint above didn't request ad_id explicitly but 'level=ad' usually returns it.
            // Actually, let's re-verify fields in insightsUrl: 'ad_name,impressions...' -> need 'ad_id'
        });

        // Let's output raw data for the agent to analyze, rather than complex logic here.
        console.log('\n--- AD INSIGHTS (Last 90 Days) ---');
        console.log(JSON.stringify(insightsData.data, null, 2));

        console.log('\n--- AD CREATIVES (Sample) ---');
        console.log(JSON.stringify(creativesData.data, null, 2));

    } catch (error) {
        console.error('Script execution failed:', error);
    }
}

fetchFacebookData();
