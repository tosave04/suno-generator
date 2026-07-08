module.exports = {
	apps: [
		{
			name: "suno-generator",
			script: "npm",
			args: "start",
			cwd: "/var/www/suno-generator",
			env: {
				NODE_ENV: "production",
				PORT: 3001,
			},
		},
	],
}
