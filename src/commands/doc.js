/**
 * Sends a button with a link to the documentation
 */
const { MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

// Global config
const config = require('../../config.json');

// Local config
const commandConfig = {
	embed: {
		title: {
			en: '🔗  Developer documentation',
			fr: '🔗  Documentation développeur',
		},
		description: {
			en: 'Browse all the classes and methods in Pokémon SDK.',
			fr: 'Parcourez l\'ensemble des classes et méthodes de Pokémon SDK.',
		}
	},
	buttonLabel: {
		en: 'Access the documentation',
		fr: 'Accéder à la documentation',
	},
};

module.exports = {
	// Build slash command
	data: new SlashCommandBuilder()
		.setName('doc')
		.setDescription('Get link to the developer documentation')
		.addStringOption(option =>
			option.setName('lang')
				.setDescription('Reply language')
				.setRequired(false)
				.addChoice('fr', 'fr')
				.addChoice('en', 'en')),

	// Command action
	async execute(interaction) {
		const lang = interaction.options.getString('lang') || 'en';

		let replyEmbed = {
			color: 0x50545b,
			title: commandConfig.embed.title[lang],
			description: commandConfig.embed.description[lang],
		};

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setStyle('LINK')
					.setURL(config.url.documentation)
					.setLabel(commandConfig.buttonLabel[lang]),
			);

		await interaction.reply({ embeds: [replyEmbed], components: [row] });
	},
};