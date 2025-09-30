#!/usr/bin/env node

/**
 * Interactive Experiences Extractor
 * Extracts all experience data from The Ultimate Collection landing page
 * NOW WITH 7 EXPERIENCES INCLUDING UNIVERSAL MESSAGE!
 */

const experiences = [
    {
        id: 'peace',
        title: '☮️ PEACE',
        subtitle: 'Find Your Center',
        description: 'Guided breathing, meditation, and tranquility',
        color: 'from-blue-400 to-cyan-300',
        features: ['🫁 Breathing Circle', '🌸 Falling Petals', '✨ Affirmations', '🌊 6 Soundscapes']
    },
    {
        id: 'energy',
        title: '⚡ FULL ENERGY',
        subtitle: 'Maximum Power',
        description: 'Explosive energy with massive visual effects',
        color: 'from-yellow-400 to-red-500',
        features: ['⚡ Lightning Strikes', '💥 Explosions', '🔥 4 Power Modes', '👑 God Mode']
    },
    {
        id: 'rainbow',
        title: '🌈 RAINBOW FOREST',
        subtitle: 'Colorful Adventure',
        description: 'Kid-friendly tree care with animal friends',
        color: 'from-pink-400 to-purple-400',
        features: ['🦊 Make Friends', '🌟 Fun Facts', '💖 Super Happy', '🎨 Rainbow Colors']
    },
    {
        id: 'ultimate',
        title: '👑 ULTIMATE TREE',
        subtitle: 'Complete Experience',
        description: 'All features, achievements, and power-ups',
        color: 'from-purple-500 to-pink-500',
        features: ['🏆 8 Achievements', '🎮 3 Game Modes', '⚡ Combo System', '🌈 Power-Ups']
    },
    {
        id: 'survivor',
        title: '☠️ APOCALYPSE',
        subtitle: 'Survival Challenge',
        description: 'Intense survival with threats and dangers',
        color: 'from-red-600 to-gray-900',
        features: ['⚠️ Random Threats', '⏳ Countdown Timer', '💀 High Stakes', '🔥 Intense Mode']
    },
    {
        id: 'garden',
        title: '🌸 PEACEFUL GARDEN',
        subtitle: 'Zen Sanctuary',
        description: 'Calming meditation with cherry blossoms',
        color: 'from-pink-300 to-purple-300',
        features: ['🧘 Meditation', '🌸 Blossoms', '☮️ Zen Points', '💫 Serenity']
    },
    {
        id: 'universal',
        title: '🌍 UNIVERSAL MESSAGE',
        subtitle: 'Finnish Sisu • Global Unity',
        description: 'Collective resilience through world philosophies',
        color: 'from-indigo-600 to-purple-600',
        features: ['💪 Sisu Power', '🌍 6 Philosophies', '🤝 Unity Building', '⚡ Resilience']
    }
];

// Display functions
function printHeader() {
    console.log('\n' + '='.repeat(70));
    console.log('🌳  THE ULTIMATE COLLECTION - Interactive Experiences  🌳');
    console.log('          NOW WITH UNIVERSAL MESSAGE! (7 Total)');
    console.log('='.repeat(70) + '\n');
}

function printExperience(exp, index) {
    console.log(`\n${index + 1}. ${exp.title}`);
    console.log(`   ${exp.subtitle}`);
    console.log(`   ─────────────────────────────────────`);
    console.log(`   📝 ${exp.description}`);
    console.log(`   🎨 Color Theme: ${exp.color}`);
    console.log(`   ✨ Features:`);
    exp.features.forEach(feature => {
        console.log(`      • ${feature}`);
    });
}

function printSummary() {
    console.log('\n' + '─'.repeat(70));
    console.log('📊 SUMMARY');
    console.log('─'.repeat(70));
    console.log(`Total Experiences: ${experiences.length}`);
    console.log(`Total Features: ${experiences.reduce((sum, exp) => sum + exp.features.length, 0)}`);
    console.log('\nExperience Types:');
    experiences.forEach(exp => {
        console.log(`  • ${exp.id.toUpperCase().padEnd(12)} - ${exp.title}`);
    });
}

function printDeploymentInfo() {
    console.log('\n' + '─'.repeat(70));
    console.log('🚀 DEPLOYMENT PLATFORMS');
    console.log('─'.repeat(70));
    console.log('  • Vercel:       vercel.com (drag & drop)');
    console.log('  • Netlify:      netlify.com/drop (instant)');
    console.log('  • CodeSandbox:  codesandbox.io (paste code)');
    console.log('  • GitHub Pages: Free hosting');
}

function exportToJSON() {
    const data = {
        collection: 'The Ultimate Collection',
        date: 'September 2025',
        totalExperiences: experiences.length,
        latestAddition: 'Universal Message - Finnish Sisu & Global Unity',
        experiences: experiences
    };
    return JSON.stringify(data, null, 2);
}

function exportToMarkdown() {
    let md = '# 🌳 The Ultimate Collection - Interactive Experiences\n\n';
    md += '> Built with React 18 • Tailwind CSS • Lucide Icons\n\n';
    md += '> **NEW:** 🌍 Universal Message - Finnish Sisu & Global Unity\n\n';
    md += '## 📦 All Experiences\n\n';
    
    experiences.forEach((exp, index) => {
        md += `### ${index + 1}. ${exp.title}\n`;
        md += `**${exp.subtitle}**\n\n`;
        md += `${exp.description}\n\n`;
        md += `**Features:**\n`;
        exp.features.forEach(feature => {
            md += `- ${feature}\n`;
        });
        md += '\n---\n\n';
    });
    
    md += '## 🌍 Special Feature: Universal Message\n\n';
    md += 'The latest addition combines Finnish **SISU** (resilience and determination) with global philosophies:\n';
    md += '- **SISU** - Finnish strength through adversity\n';
    md += '- **UBUNTU** - African wisdom of collective humanity\n';
    md += '- **IKIGAI** - Japanese purpose and meaning\n';
    md += '- **HYGGE** - Nordic comfort and togetherness\n';
    md += '- **NAMASTE** - Ancient greeting of mutual respect\n\n';
    md += 'Together We Persevere. Together We Rise. Together We Thrive.\n\n';
    
    md += '## 🚀 Quick Deploy\n\n';
    md += 'Deploy instantly to these platforms:\n';
    md += '- **Vercel:** vercel.com (drag & drop)\n';
    md += '- **Netlify:** netlify.com/drop (instant)\n';
    md += '- **CodeSandbox:** codesandbox.io (paste code)\n';
    md += '- **GitHub Pages:** Free hosting\n';
    
    return md;
}

// Main execution
function main() {
    printHeader();
    
    experiences.forEach((exp, index) => {
        printExperience(exp, index);
    });
    
    printSummary();
    printDeploymentInfo();
    
    console.log('\n' + '='.repeat(70));
    console.log('✅ Export Options Available:');
    console.log('   - Run with --json flag to export JSON');
    console.log('   - Run with --md flag to export Markdown');
    console.log('='.repeat(70) + '\n');
}

// Handle command line arguments
const args = process.argv.slice(2);

if (args.includes('--json')) {
    console.log(exportToJSON());
} else if (args.includes('--md')) {
    console.log(exportToMarkdown());
} else if (args.includes('--help')) {
    console.log('\nUsage: node extract-experiences.js [options]\n');
    console.log('Options:');
    console.log('  --json    Export as JSON');
    console.log('  --md      Export as Markdown');
    console.log('  --help    Show this help message\n');
} else {
    main();
}

// Export for use as module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { experiences, exportToJSON, exportToMarkdown };
}
