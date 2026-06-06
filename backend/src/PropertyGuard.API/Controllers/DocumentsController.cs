using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PropertyGuard.Core.DTOs.Requests;
using PropertyGuard.Core.Entities;
using PropertyGuard.Infrastructure.Data;

namespace PropertyGuard.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DocumentsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IWebHostEnvironment _env;

    public DocumentsController(ApplicationDbContext context, IWebHostEnvironment env)
    {
        _context = context;
        _env = env;
    }

    [HttpPost("upload")]
    public async Task<ActionResult<DocumentDto>> Upload([FromForm] int requestId, IFormFile file)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;

        var request = await _context.VerificationRequests.FindAsync(requestId);
        if (request == null) return NotFound("Request not found");

        var uploadsPath = Path.Combine(_env.WebRootPath ?? "wwwroot", "uploads", requestId.ToString());
        Directory.CreateDirectory(uploadsPath);

        var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
        var filePath = Path.Combine(uploadsPath, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        var document = new Document
        {
            RequestId = requestId,
            FileName = file.FileName,
            FilePath = $"/uploads/{requestId}/{fileName}",
            FileSize = file.Length,
            ContentType = file.ContentType,
            UploadedById = userId
        };

        _context.Documents.Add(document);
        await _context.SaveChangesAsync();

        var user = await _context.Users.FindAsync(userId);

        return Ok(new DocumentDto
        {
            Id = document.Id,
            FileName = document.FileName,
            FileSize = document.FileSize,
            ContentType = document.ContentType,
            UploadedBy = user?.FullName ?? "",
            UploadedAt = document.UploadedAt
        });
    }

    [HttpGet("request/{requestId}")]
    public async Task<ActionResult<List<DocumentDto>>> GetByRequest(int requestId)
    {
        var documents = await _context.Documents
            .Where(d => d.RequestId == requestId)
            .Include(d => d.UploadedBy)
            .Select(d => new DocumentDto
            {
                Id = d.Id,
                FileName = d.FileName,
                FileSize = d.FileSize,
                ContentType = d.ContentType,
                UploadedBy = d.UploadedBy.FullName,
                UploadedAt = d.UploadedAt
            }).ToListAsync();

        return Ok(documents);
    }

    [HttpGet("{id}/download")]
    public async Task<IActionResult> Download(int id)
    {
        var document = await _context.Documents.FindAsync(id);
        if (document == null) return NotFound();

        var filePath = Path.Combine(_env.WebRootPath ?? "wwwroot", document.FilePath.TrimStart('/'));
        if (!System.IO.File.Exists(filePath)) return NotFound("File not found on disk");

        var bytes = await System.IO.File.ReadAllBytesAsync(filePath);
        return File(bytes, document.ContentType, document.FileName);
    }
}
