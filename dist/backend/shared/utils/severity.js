"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSeverityColor = getSeverityColor;
exports.getSeverityLabel = getSeverityLabel;
exports.calculateSeverity = calculateSeverity;
function getSeverityColor(severity) {
    switch (severity) {
        case 'cursed':
            return '#ff0000';
        case 'haunted':
            return '#ff6b35';
        case 'spooky':
            return '#ffa500';
        case 'clean':
            return '#2dd881';
    }
}
function getSeverityLabel(severity, spooky) {
    if (!spooky) {
        switch (severity) {
            case 'cursed':
                return 'Critical';
            case 'haunted':
                return 'High';
            case 'spooky':
                return 'Medium';
            case 'clean':
                return 'Clean';
        }
    }
    return severity.charAt(0).toUpperCase() + severity.slice(1);
}
function calculateSeverity(issueCount, complexity) {
    const score = issueCount * 2 + complexity;
    if (score >= 20)
        return 'cursed';
    if (score >= 10)
        return 'haunted';
    if (score >= 5)
        return 'spooky';
    return 'clean';
}
//# sourceMappingURL=severity.js.map