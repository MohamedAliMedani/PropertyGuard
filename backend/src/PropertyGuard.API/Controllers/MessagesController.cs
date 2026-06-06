using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PropertyGuard.Core.DTOs.Messages;
using PropertyGuard.Core.Entities;
using PropertyGuard.Infrastructure.Data;

namespace PropertyGuard.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class MessagesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public MessagesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("conversations")]
    public async Task<ActionResult<List<ConversationDto>>> GetConversations()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var role = User.FindFirstValue(ClaimTypes.Role)!;

        var query = _context.Conversations
            .Include(c => c.Request)
            .Include(c => c.Messages).ThenInclude(m => m.Sender)
            .AsQueryable();

        if (role == "Customer")
            query = query.Where(c => c.Request.CustomerId == userId);
        else
            query = query.Where(c => c.Request.ExpertAssignments.Any(ea => ea.ExpertId == userId));

        var conversations = await query.Select(c => new ConversationDto
        {
            Id = c.Id,
            RequestNumber = c.Request.RequestNumber,
            LastMessage = c.Messages.OrderByDescending(m => m.SentAt).Select(m => m.Text).FirstOrDefault() ?? "",
            LastMessageAt = c.Messages.OrderByDescending(m => m.SentAt).Select(m => m.SentAt).FirstOrDefault(),
            UnreadCount = c.Messages.Count(m => !m.IsRead && m.SenderId != userId)
        }).ToListAsync();

        return Ok(conversations);
    }

    [HttpGet("conversations/{conversationId}")]
    public async Task<ActionResult<List<MessageDto>>> GetMessages(int conversationId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;

        var messages = await _context.Messages
            .Where(m => m.ConversationId == conversationId)
            .Include(m => m.Sender)
            .OrderBy(m => m.SentAt)
            .Select(m => new MessageDto
            {
                Id = m.Id,
                SenderId = m.SenderId,
                SenderName = m.Sender.FullName,
                Text = m.Text,
                IsRead = m.IsRead,
                SentAt = m.SentAt
            }).ToListAsync();

        // Mark as read
        var unread = await _context.Messages
            .Where(m => m.ConversationId == conversationId && !m.IsRead && m.SenderId != userId)
            .ToListAsync();
        unread.ForEach(m => m.IsRead = true);
        await _context.SaveChangesAsync();

        return Ok(messages);
    }

    [HttpPost]
    public async Task<ActionResult<MessageDto>> SendMessage([FromBody] SendMessageDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var user = await _context.Users.FindAsync(userId);

        var message = new Message
        {
            ConversationId = dto.ConversationId,
            SenderId = userId,
            Text = dto.Text
        };

        _context.Messages.Add(message);
        await _context.SaveChangesAsync();

        return Ok(new MessageDto
        {
            Id = message.Id,
            SenderId = userId,
            SenderName = user?.FullName ?? "",
            Text = message.Text,
            IsRead = false,
            SentAt = message.SentAt
        });
    }
}
