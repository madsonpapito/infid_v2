import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'survey-responses.json')

// Ensure data directory exists
function ensureDataDir() {
    const dir = path.dirname(DATA_FILE)
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify({ responses: [], summary: {} }, null, 2))
    }
}

function loadData() {
    ensureDataDir()
    const raw = fs.readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(raw)
}

function saveData(data: any) {
    ensureDataDir()
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
}

function computeSummary(responses: any[]) {
    const total = responses.length
    if (total === 0) return {}

    const fields = ['gender', 'ageRange', 'relationshipStatus', 'suspicionLevel']
    const summary: any = { totalResponses: total }

    for (const field of fields) {
        const counts: Record<string, number> = {}
        for (const r of responses) {
            const val = r[field]
            if (val) {
                counts[val] = (counts[val] || 0) + 1
            }
        }
        summary[field] = Object.entries(counts).map(([value, count]) => ({
            value,
            count,
            percentage: Math.round((count / total) * 100)
        })).sort((a, b) => b.count - a.count)
    }

    // Red flags are multi-select, count each independently
    const flagCounts: Record<string, number> = {}
    for (const r of responses) {
        if (r.redFlags && Array.isArray(r.redFlags)) {
            for (const flag of r.redFlags) {
                flagCounts[flag] = (flagCounts[flag] || 0) + 1
            }
        }
    }
    summary.redFlags = Object.entries(flagCounts).map(([value, count]) => ({
        value,
        count,
        percentage: Math.round((count / total) * 100)
    })).sort((a, b) => b.count - a.count)

    return summary
}

// POST - Save a new survey response
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { gender, ageRange, relationshipStatus, suspicionLevel, redFlags } = body

        const data = loadData()
        const response = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            gender,
            ageRange,
            relationshipStatus,
            suspicionLevel,
            redFlags
        }

        data.responses.push(response)
        data.summary = computeSummary(data.responses)
        saveData(data)

        return NextResponse.json({ success: true, totalResponses: data.responses.length })
    } catch (error) {
        console.error('Error saving survey response:', error)
        return NextResponse.json({ error: 'Failed to save response' }, { status: 500 })
    }
}

// GET - Return summary with counts and percentages
export async function GET() {
    try {
        const data = loadData()
        return NextResponse.json(data.summary)
    } catch (error) {
        console.error('Error reading survey data:', error)
        return NextResponse.json({ error: 'Failed to load data' }, { status: 500 })
    }
}
