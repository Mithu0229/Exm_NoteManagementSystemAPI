using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NoteManagementSystemAPI.Models;
using NoteManagementSystemAPI.Models.Dtos;
using NoteManagementSystemAPI.Services;
using System.Security.Claims;
namespace NoteManagementSystemAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class NotesController : ControllerBase
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly INoteService _noteService;

    public NotesController(IHttpContextAccessor httpContextAccessor, INoteService noteService)
    {
        _httpContextAccessor = httpContextAccessor;
        _noteService = noteService;
    }

    [HttpPost("create")]
    public IActionResult Create([FromBody] CreateNoteDto model)
    {
        var userId = GetUserIdFromToken();
        _noteService.AddNote(model, userId);
        return Ok(new { message = "Note created successfully" });
    }

    [HttpGet("GetNotes")]
    public IActionResult Get()
    {
        var userId = GetUserIdFromToken();
        var notes = _noteService.GetListByUserId(userId) ; 
        return Ok(notes);
    }
    [HttpDelete("DeleteNote/{id}")]
    public IActionResult Delete(int id)
    {
        var notes = _noteService.DeleteNote(id); 
        return Ok(notes);
    }
    [HttpPut("UpdateNote/{id}")]
    public IActionResult UpdateNote(int id, Note model)
    {
        var note= _noteService.UpdateNote(id,model);
        return Ok(note);
    }

    [HttpGet("CompleteTask/{id}")]
    public IActionResult CompleteTask(int id)
    {
        var note=_noteService.CompletedTask(id);
        return Ok(note);
    }

    [HttpGet("GetNoteById/{id}")]
    public IActionResult GetNoteById(int id)
    {
        var item = _noteService.GetNoteById(id);
        return Ok(item);
    }
    private int GetUserIdFromToken()
    {
        var userIdClaim = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
        if (userIdClaim == null) throw new UnauthorizedAccessException();
        return int.Parse(userIdClaim.Value);
    }
}
